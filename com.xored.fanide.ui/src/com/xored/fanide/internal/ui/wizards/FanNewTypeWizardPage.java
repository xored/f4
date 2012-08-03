package com.xored.fanide.internal.ui.wizards;

import static com.xored.fanide.core.FanCore.POD_EXTENSION;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

import org.eclipse.core.filesystem.EFS;
import org.eclipse.core.filesystem.IFileStore;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.dltk.ast.declarations.ModuleDeclaration;
import org.eclipse.dltk.compiler.util.Util;
import org.eclipse.dltk.core.DLTKLanguageManager;
import org.eclipse.dltk.core.IBuffer;
import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.core.IType;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.ScriptModelUtil;
import org.eclipse.dltk.core.SourceParserUtil;
import org.eclipse.dltk.core.search.IDLTKSearchConstants;
import org.eclipse.dltk.core.search.IDLTKSearchScope;
import org.eclipse.dltk.core.search.SearchEngine;
import org.eclipse.dltk.core.search.TypeNameMatch;
import org.eclipse.dltk.core.search.TypeNameMatchRequestor;
import org.eclipse.dltk.debug.ui.messages.DLTKLaunchConfigurationsMessages;
import org.eclipse.dltk.internal.core.ModelElement;
import org.eclipse.dltk.internal.core.SourceType;
import org.eclipse.dltk.internal.ui.dialogs.TextFieldNavigationHandler;
import org.eclipse.dltk.internal.ui.navigator.ScriptExplorerContentProvider;
import org.eclipse.dltk.internal.ui.navigator.ScriptExplorerLabelProvider;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.DialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.IDialogFieldListener;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.IListAdapter;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.IStringButtonAdapter;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.LayoutUtil;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.ListDialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.SelectionButtonDialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.SelectionButtonDialogFieldGroup;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.Separator;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.StringButtonDialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.StringDialogField;
import org.eclipse.dltk.ui.DLTKPluginImages;
import org.eclipse.dltk.ui.dialogs.FilteredTypesSelectionDialog;
import org.eclipse.dltk.ui.dialogs.StatusInfo;
import org.eclipse.dltk.ui.preferences.CodeTemplatesPreferencePage;
import org.eclipse.dltk.ui.text.templates.ICodeTemplateArea;
import org.eclipse.dltk.ui.text.templates.SourceModuleTemplateContext;
import org.eclipse.dltk.ui.util.CodeGeneration;
import org.eclipse.dltk.ui.viewsupport.BasicElementLabels;
import org.eclipse.dltk.ui.wizards.NewContainerWizardPage;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.text.templates.Template;
import org.eclipse.jface.text.templates.TemplateContextType;
import org.eclipse.jface.text.templates.persistence.TemplateStore;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.jface.viewers.TableViewer;
import org.eclipse.osgi.util.NLS;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.dialogs.ElementTreeSelectionDialog;
import org.eclipse.ui.dialogs.PreferencesUtil;
import org.eclipse.ui.views.navigator.ResourceComparator;

import com.xored.fanide.ast.declarations.FanModifiers;
import com.xored.fanide.ast.statements.UsingStmt;
import com.xored.fanide.core.FanLanguageToolkit;
import com.xored.fanide.core.FanNature;
import com.xored.fanide.core.utils.FanASTUtils;
import com.xored.fanide.core.utils.FanUsing;
import com.xored.fanide.internal.ui.FanCodeTemplateArea;
import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.FanUILanguageToolkit;
import com.xored.fanide.internal.ui.dialogs.FanTypeSelectionExtension;
import com.xored.fanide.internal.ui.filters.FanScriptFileFilter;
import com.xored.fanide.internal.ui.preferences.NewWizardMessages;
import com.xored.fanide.internal.ui.text.FanCodeTemplateAccess;
import com.xored.fanide.ui.FanPreferenceConstants;

@SuppressWarnings("restriction")
public abstract class FanNewTypeWizardPage extends NewContainerWizardPage {
	/**
	 * Class used in stub creation routines to add needed imports to a source
	 * module.
	 */
	public class UsingsManager {
		private SortedSet<FanUsing> usings;
		private SortedSet<FanUsing> moduleUsings;
		private ISourceModule module;
		private String lineDelimiter;
		private UsingStmt[] usingStatements;

		UsingsManager(ISourceModule module, boolean rewriteUsings) {
			this.module = module;
			try {
				lineDelimiter = CodeGeneration
						.getLineDelimiterUsed(fCurrentSourceModule);
				if (lineDelimiter.length() == 0)
					lineDelimiter = "\n";
			} catch (ModelException e) {
				lineDelimiter = "\n";
			}
			usings = new TreeSet<FanUsing>();
			moduleUsings = new TreeSet<FanUsing>();
			usingStatements = new UsingStmt[0];
			for (UsingStmt stmt : usingStatements) {
				moduleUsings.add(new FanUsing(stmt));
			}
		}

		public void addUsing(String qualifiedName, boolean allPod) {
			FanUsing using = new FanUsing(qualifiedName);
			if (using.getTypeName() == null && !allPod)
				return;
			if (!moduleUsings.contains(using))
				usings.add(using);
		}

		public void addUsings(List<String> qualifiedNames, boolean allPods) {
			for (String name : qualifiedNames) {
				FanUsing using = new FanUsing(name);
				if (using.getTypeName() == null && !allPods)
					continue;
				if (!moduleUsings.contains(using))
					usings.add(using);
			}
		}

		public void removeUsing(String qualifiedName) {
			usings.remove(new FanUsing(qualifiedName));
		}

		public void removeUsings(List<String> qualifiedNames) {
			for (String name : qualifiedNames) {
				usings.remove(new FanUsing(name));
			}
		}

		public boolean rewriteUsings() {
			try {
				IBuffer buffer = module.getBuffer();
				if (buffer != null && !buffer.isClosed()
						&& !buffer.isReadOnly()) {
					int usingsBeginPosition = buffer.getLength();
					int usingsEndPosition = 0;
					for (UsingStmt stmt : usingStatements) {
						usingsBeginPosition = Math.min(stmt.sourceStart(),
								usingsBeginPosition);
						usingsEndPosition = Math.max(stmt.sourceEnd(),
								usingsEndPosition);
					}

					String text = "";
					TreeSet<FanUsing> allusings = new TreeSet<FanUsing>();
					allusings.addAll(usings);
					allusings.addAll(moduleUsings);
					for (FanUsing using : allusings) {
						text += using + lineDelimiter;
					}
					if (usingsEndPosition - usingsBeginPosition > 0) {
						buffer.replace(usingsBeginPosition, usingsEndPosition
								- usingsBeginPosition, text);
						return true;
					}
				} else {
					return false;
				}
			} catch (ModelException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return false;
		}

		public boolean appendUsings() {
			try {
				IBuffer buffer = module.getBuffer();
				if (buffer != null && !buffer.isClosed()
						&& !buffer.isReadOnly()) {
					int usingsEndPosition = 0;
					for (UsingStmt stmt : usingStatements) {
						usingsEndPosition = Math.max(stmt.sourceEnd(),
								usingsEndPosition);
					}

					String text = "";
					for (FanUsing using : usings) {
						text += lineDelimiter + using;
					}
					if (usingsEndPosition > 0) {
						buffer.replace(usingsEndPosition, 0, text);
						return true;
					}
				} else {
					return false;
				}
			} catch (ModelException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return false;
		}

		public String getUsings() {
			String text = "";
			for (FanUsing using : usings) {
				text += using + lineDelimiter;
			}
			return text;
		}
	}

	private static class MixinsListLabelProvider extends LabelProvider {
		private Image fMixinImage;

		public MixinsListLabelProvider() {
			fMixinImage = DLTKPluginImages
					.get(DLTKPluginImages.IMG_OBJS_INTERFACE);
		}

		@Override
		public String getText(Object element) {
			return BasicElementLabels
					.getJavaElementName(((MixinWrapper) element).mixinQualifiedName);
		}

		@Override
		public Image getImage(Object element) {
			return fMixinImage;
		}
	}

	private static class MixinWrapper {
		public String mixinName;
		public String mixinQualifiedName;

		public MixinWrapper(String mixinQualifiedName) {
			this.mixinQualifiedName = mixinQualifiedName;
			int pos = mixinQualifiedName.lastIndexOf("::");
			if (pos != -1)
				this.mixinName = mixinQualifiedName
						.substring(mixinQualifiedName.lastIndexOf("::") + 2);
			else
				this.mixinName = mixinQualifiedName;
		}

		@Override
		public int hashCode() {
			return mixinQualifiedName.hashCode();
		}

		@Override
		public boolean equals(Object obj) {
			return obj != null
					&& getClass().equals(obj.getClass())
					&& ((MixinWrapper) obj).mixinQualifiedName
							.equals(mixinQualifiedName);
		}
	}

	private class FanTypeFieldsAdapter implements IStringButtonAdapter,
			IDialogFieldListener, IListAdapter, SelectionListener {
		public void changeControlPressed(DialogField field) {
			typePageChangeControlPressed(field);
		}

		public void dialogFieldChanged(DialogField field) {
			typePageDialogFieldChanged(field);
		}

		public void customButtonPressed(ListDialogField field, int index) {
			typePageCustomButtonPressed(field, index);
		}

		public void doubleClicked(ListDialogField field) {
		}

		public void selectionChanged(ListDialogField field) {
		}

		public void widgetDefaultSelected(SelectionEvent e) {
			typePageLinkActivated();
		}

		public void widgetSelected(SelectionEvent e) {
			typePageLinkActivated();
		}
	}

	private IType fCreatedType;
	private ISourceModule fCurrentSourceModule;
	private String lineDelimiter = "\n";

	private IScriptFolder currentScriptFolder;

	public int F_PUBLIC = FanModifiers.AccPublic;
	public int F_INTERNAL = FanModifiers.AccInternal;
	public int F_CONST = FanModifiers.AccConst;
	public int F_FINAL = FanModifiers.AccFinal;
	public int F_ABSTRACT = FanModifiers.AccAbstract;

	private final static String PAGE_NAME = "com.xored.fanide.ui.FanNewTypeWizardPage"; //$NON-NLS-1$

	protected final static String FILENAME = PAGE_NAME + ".filename"; //$NON-NLS-1$

	protected final static String FILENAMESELECTION = FILENAME + ".existing"; //$NON-NLS-1$

	protected final static String TYPENAME = PAGE_NAME + ".typename"; //$NON-NLS-1$

	protected final static String SUPER = PAGE_NAME + ".superclass"; //$NON-NLS-1$

	protected final static String MIXINS = PAGE_NAME + ".mixins"; //$NON-NLS-1$

	protected final static String MODIFIERS = PAGE_NAME + ".modifiers"; //$NON-NLS-1$

	protected final static String METHODS = PAGE_NAME + ".methods"; //$NON-NLS-1$

	private SelectionButtonDialogField fFilenameExistingSelection;
	private StringButtonDialogField fFilenameDialogField;
	private boolean fCanModifyFilename;

	private StringDialogField fTypeNameDialogField;
	private StringButtonDialogField fSuperClassDialogField;
	private ListDialogField fSuperMixinsDialogField;

	private SelectionButtonDialogFieldGroup fAccMdfButtons;
	private SelectionButtonDialogFieldGroup fOtherMdfButtons;

	private SelectionButtonDialogField fAddCommentButton;
	private boolean fUseAddCommentButtonValue;

	// private JavaPackageCompletionProcessor fCurrPackageCompletionProcessor;
	// private JavaTypeCompletionProcessor fEnclosingTypeCompletionProcessor;
	// private StubTypeContext fSuperClassStubTypeContext;
	// private StubTypeContext fSuperInterfaceStubTypeContext;

	protected IStatus fFilenameStatus;
	protected IStatus fTypeNameStatus;
	protected IStatus fSuperClassStatus;
	protected IStatus fModifierStatus;
	protected IStatus fSuperMixinsStatus;

	private final int PUBLIC_INDEX = 0, INTERNAL_INDEX = 1, DEFAULT_INDEX = 2;
	private final int ABSTRACT_INDEX = 0, FINAL_INDEX = 1, CONST_INDEX = 2;
	private final int CONST_INDEX_MIXIN = 0;

	private int fTypeKind;
	public static final int CLASS_TYPE = 1;
	public static final int MIXIN_TYPE = 2;
	public static final int ENUM_TYPE = 3;

	public FanNewTypeWizardPage(boolean isClass, String pageName) {
		this(isClass ? CLASS_TYPE : MIXIN_TYPE, pageName);
	}

	public FanNewTypeWizardPage(int typeKind, String pageName) {
		super(pageName);
		fTypeKind = typeKind;

		FanTypeFieldsAdapter adapter = new FanTypeFieldsAdapter();

		fFilenameExistingSelection = new SelectionButtonDialogField(SWT.CHECK);
		fFilenameExistingSelection.setDialogFieldListener(adapter);
		fFilenameExistingSelection
				.setLabelText(FanWizardMessages.NewTypeWizardPage_filename_existing_selection_label);

		fFilenameDialogField = new StringButtonDialogField(adapter);
		fFilenameDialogField.setDialogFieldListener(adapter);
		fFilenameDialogField
				.setButtonLabel(FanWizardMessages.NewTypeWizardPage_filename_button);
		fFilenameDialogField
				.setLabelText(FanWizardMessages.NewTypeWizardPage_filename_label);

		fTypeNameDialogField = new StringDialogField();
		fTypeNameDialogField.setDialogFieldListener(adapter);
		fTypeNameDialogField.setLabelText(getTypeNameLabel());

		fSuperClassDialogField = new StringButtonDialogField(adapter);
		fSuperClassDialogField.setDialogFieldListener(adapter);
		fSuperClassDialogField.setLabelText(getSuperClassLabel());
		fSuperClassDialogField
				.setButtonLabel(FanWizardMessages.NewTypeWizardPage_superclass_button);

		String[] addButtons = new String[] {
				FanWizardMessages.NewTypeWizardPage_mixins_add,
				/* 1 */null, FanWizardMessages.NewTypeWizardPage_mixins_remove };
		fSuperMixinsDialogField = new ListDialogField(adapter, addButtons,
				new MixinsListLabelProvider());
		fSuperMixinsDialogField.setDialogFieldListener(adapter);
		fSuperMixinsDialogField
				.setTableColumns(new ListDialogField.ColumnsDescription(1,
						false));
		fSuperMixinsDialogField.setLabelText(getSuperMixinsLabel());
		fSuperMixinsDialogField.setRemoveButtonIndex(2);

		String[] buttonNames1 = new String[] {
				FanWizardMessages.NewTypeWizardPage_labelModifiersPublic,
				FanWizardMessages.NewTypeWizardPage_labelModifiersInternal,
				FanWizardMessages.NewTypeWizardPage_labelModifiersDefault };
		fAccMdfButtons = new SelectionButtonDialogFieldGroup(SWT.RADIO,
				buttonNames1, 3);
		fAccMdfButtons.setDialogFieldListener(adapter);
		fAccMdfButtons.setLabelText(getModifiersLabel());
		fAccMdfButtons.setSelection(0, false);

		String[] buttonNames2;
		if (fTypeKind == CLASS_TYPE)
			buttonNames2 = new String[] {
					FanWizardMessages.NewTypeWizardPage_labelModifiersAbstract,
					FanWizardMessages.NewTypeWizardPage_labelModifiersFinal,
					FanWizardMessages.NewTypeWizardPage_labelModifiersConst };
		else if (fTypeKind == MIXIN_TYPE)
			buttonNames2 = new String[] { FanWizardMessages.NewTypeWizardPage_labelModifiersConst };
		else
			buttonNames2 = new String[] {};

		fOtherMdfButtons = new SelectionButtonDialogFieldGroup(SWT.CHECK,
				buttonNames2, 3);
		fOtherMdfButtons.setDialogFieldListener(adapter);

		fAddCommentButton = new SelectionButtonDialogField(SWT.CHECK);
		fAddCommentButton
				.setLabelText(FanWizardMessages.NewTypeWizardPage_addcomment_label);

		fUseAddCommentButtonValue = false;

		// fCurrPackageCompletionProcessor= new
		// JavaPackageCompletionProcessor();
		// fEnclosingTypeCompletionProcessor= new
		// JavaTypeCompletionProcessor(false, false, true);

		fFilenameStatus = new StatusInfo();

		fCanModifyFilename = true;

		fTypeNameStatus = new StatusInfo();
		fSuperClassStatus = new StatusInfo();
		fSuperMixinsStatus = new StatusInfo();
		fModifierStatus = new StatusInfo();

		setModifiers(FanModifiers.AccDefault, true);
	}

	/**
	 * Initializes all fields provided by the page with a given selection.
	 * 
	 * @param elem
	 *            the selection used to initialize this page or <code>
	 * null</code> if no selection was available
	 */
	protected void initTypePage(IModelElement elem) {
		//		String initSuperclass= "java.lang.Object"; //$NON-NLS-1$
		// ArrayList initSuperinterfaces= new ArrayList(5);
		//
		// IJavaProject project= null;
		// IPackageFragment pack= null;
		// IType enclosingType= null;
		//
		// if (elem != null) {
		// // evaluate the enclosing type
		// project= elem.getJavaProject();
		// pack= (IPackageFragment)
		// elem.getAncestor(IJavaElement.PACKAGE_FRAGMENT);
		// IType typeInCU= (IType) elem.getAncestor(IJavaElement.TYPE);
		// if (typeInCU != null) {
		// if (typeInCU.getCompilationUnit() != null) {
		// enclosingType= typeInCU;
		// }
		// } else {
		// ICompilationUnit cu= (ICompilationUnit)
		// elem.getAncestor(IJavaElement.COMPILATION_UNIT);
		// if (cu != null) {
		// enclosingType= cu.findPrimaryType();
		// }
		// }
		//
		// try {
		// IType type= null;
		// if (elem.getElementType() == IJavaElement.TYPE) {
		// type= (IType)elem;
		// if (type.exists()) {
		// String superName=
		// SuperInterfaceSelectionDialog.getNameWithTypeParameters(type);
		// if (type.isInterface()) {
		// initSuperinterfaces.add(superName);
		// } else {
		// initSuperclass= superName;
		// }
		// }
		// }
		// } catch (JavaModelException e) {
		// JavaPlugin.log(e);
		// // ignore this exception now
		// }
		// }
		//
		//		String typeName= ""; //$NON-NLS-1$
		//
		// ITextSelection selection= getCurrentTextSelection();
		// if (selection != null) {
		// String text= selection.getText();
		// if (text != null && validateJavaTypeName(text, project).isOK()) {
		// typeName= text;
		// }
		// }
		//
		// setPackageFragment(pack, true);
		// setEnclosingType(enclosingType, true);
		// setEnclosingTypeSelection(false, true);
		//
		// setTypeName(typeName, true);
		// setSuperClass(initSuperclass, true);
		// setSuperInterfaces(initSuperinterfaces, true);
		//
		setAddComments(FanUILanguageToolkit.getInstance().getPreferenceStore()
				.getBoolean(FanPreferenceConstants.CODEGEN_ADD_COMMENTS), true); // from
		// project or workspace
	}

	// private static IStatus validateJavaTypeName(String text, IJavaProject
	// project) {
	// if (project == null || !project.exists()) {
	// return JavaConventions.validateJavaTypeName(text, JavaCore.VERSION_1_3,
	// JavaCore.VERSION_1_3);
	// }
	// return JavaConventionsUtil.validateJavaTypeName(text, project);
	// }

	protected String getTypeNameLabel() {
		return FanWizardMessages.NewTypeWizardPage_typename_label;
	}

	protected String getModifiersLabel() {
		return FanWizardMessages.NewTypeWizardPage_modifiers_acc_label;
	}

	protected String getSuperClassLabel() {
		return FanWizardMessages.NewTypeWizardPage_superclass_label;
	}

	protected String getSuperMixinsLabel() {
		if (fTypeKind != MIXIN_TYPE)
			return FanWizardMessages.NewTypeWizardPage_mixins_class_label;
		return FanWizardMessages.NewTypeWizardPage_mixins_ifc_label;
	}

	protected void createSeparator(Composite composite, int nColumns) {
		(new Separator(SWT.SEPARATOR | SWT.HORIZONTAL)).doFillIntoGrid(
				composite, nColumns, convertHeightInCharsToPixels(1));
	}

	protected void createFilenameControls(Composite composite, int nColumns) {
		fFilenameDialogField.doFillIntoGrid(composite, nColumns);

		Text text = fFilenameDialogField.getTextControl(composite);
		LayoutUtil.setWidthHint(text, getMaxFieldWidth());
		LayoutUtil.setHorizontalSpan(text, 2);
		LayoutUtil.setHorizontalGrabbing(text);
		TextFieldNavigationHandler.install(text);

		DialogField.createEmptySpace(composite);

		Composite tabGroup = new Composite(composite, SWT.NONE);
		GridLayout layout = new GridLayout();
		layout.marginWidth = 0;
		layout.marginHeight = 0;
		tabGroup.setLayout(layout);
		fFilenameExistingSelection.doFillIntoGrid(tabGroup, 1);

		updateEnableState();
	}

	protected void createTypeNameControls(Composite composite, int nColumns) {
		fTypeNameDialogField.doFillIntoGrid(composite, nColumns - 1);
		DialogField.createEmptySpace(composite);

		Text text = fTypeNameDialogField.getTextControl(null);
		LayoutUtil.setWidthHint(text, getMaxFieldWidth());
		TextFieldNavigationHandler.install(text);
	}

	protected void createModifierControls(Composite composite, int nColumns) {
		LayoutUtil.setHorizontalSpan(fAccMdfButtons.getLabelControl(composite),
				1);

		Control control = fAccMdfButtons.getSelectionButtonsGroup(composite);
		GridData gd = new GridData(GridData.HORIZONTAL_ALIGN_FILL);
		gd.horizontalSpan = nColumns - 2;
		control.setLayoutData(gd);

		DialogField.createEmptySpace(composite);

		if (fTypeKind == CLASS_TYPE || fTypeKind == MIXIN_TYPE) {
			DialogField.createEmptySpace(composite);

			control = fOtherMdfButtons.getSelectionButtonsGroup(composite);
			gd = new GridData(GridData.HORIZONTAL_ALIGN_FILL);
			gd.horizontalSpan = nColumns - 2;
			control.setLayoutData(gd);

			DialogField.createEmptySpace(composite);
		}
	}

	protected void createSuperClassControls(Composite composite, int nColumns) {
		fSuperClassDialogField.doFillIntoGrid(composite, nColumns);
		Text text = fSuperClassDialogField.getTextControl(null);
		LayoutUtil.setWidthHint(text, getMaxFieldWidth());

		// JavaTypeCompletionProcessor superClassCompletionProcessor= new
		// JavaTypeCompletionProcessor(false, false, true);
		// superClassCompletionProcessor.setCompletionContextRequestor(new
		// CompletionContextRequestor() {
		// public StubTypeContext getStubTypeContext() {
		// return getSuperClassStubTypeContext();
		// }
		// });
		//
		// ControlContentAssistHelper.createTextContentAssistant(text,
		// superClassCompletionProcessor);
		TextFieldNavigationHandler.install(text);
	}

	protected void createSuperMixinsControls(Composite composite, int nColumns) {
		final String MIXIN = "mixin";
		fSuperMixinsDialogField.doFillIntoGrid(composite, nColumns);
		final TableViewer tableViewer = fSuperMixinsDialogField
				.getTableViewer();
		tableViewer.setColumnProperties(new String[] { MIXIN });

		// TableTextCellEditor cellEditor= new TableTextCellEditor(tableViewer,
		// 0) {
		// protected void doSetFocus() {
		// if (text != null) {
		// text.setFocus();
		// text.setSelection(text.getText().length());
		// checkSelection();
		// checkDeleteable();
		// checkSelectable();
		// }
		// }
		// };
		// JavaTypeCompletionProcessor superInterfaceCompletionProcessor= new
		// JavaTypeCompletionProcessor(false, false, true);
		// superInterfaceCompletionProcessor.setCompletionContextRequestor(new
		// CompletionContextRequestor() {
		// public StubTypeContext getStubTypeContext() {
		// return getSuperInterfacesStubTypeContext();
		// }
		// });
		// SubjectControlContentAssistant contentAssistant=
		// ControlContentAssistHelper.createJavaContentAssistant(superInterfaceCompletionProcessor);
		// Text cellEditorText= cellEditor.getText();
		// ContentAssistHandler.createHandlerForText(cellEditorText,
		// contentAssistant);
		// TextFieldNavigationHandler.install(cellEditorText);
		// cellEditor.setContentAssistant(contentAssistant);
		//
		// tableViewer.setCellEditors(new CellEditor[] { cellEditor });
		// tableViewer.setCellModifier(new ICellModifier() {
		// public void modify(Object element, String property, Object value) {
		// if (element instanceof Item)
		// element = ((Item) element).getData();
		//
		// ((InterfaceWrapper) element).interfaceName= (String) value;
		// fSuperInterfacesDialogField.elementChanged(element);
		// }
		// public Object getValue(Object element, String property) {
		// return ((InterfaceWrapper) element).interfaceName;
		// }
		// public boolean canModify(Object element, String property) {
		// return true;
		// }
		// });
		// tableViewer.getTable().addKeyListener(new KeyAdapter() {
		// public void keyPressed(KeyEvent event) {
		// if (event.keyCode == SWT.F2 && event.stateMask == 0) {
		// ISelection selection= tableViewer.getSelection();
		// if (! (selection instanceof IStructuredSelection))
		// return;
		// IStructuredSelection structuredSelection= (IStructuredSelection)
		// selection;
		// tableViewer.editElement(structuredSelection.getFirstElement(), 0);
		// }
		// }
		// });
		GridData gd = (GridData) fSuperMixinsDialogField.getListControl(null)
				.getLayoutData();
		if (fTypeKind == CLASS_TYPE) {
			gd.heightHint = convertHeightInCharsToPixels(3);
		} else {
			gd.heightHint = convertHeightInCharsToPixels(6);
		}
		gd.grabExcessVerticalSpace = false;
		gd.widthHint = getMaxFieldWidth();
	}

	protected void createCommentControls(Composite composite, int nColumns) {
		Link link = new Link(composite, SWT.NONE);
		link.setText(FanWizardMessages.NewTypeWizardPage_addcomment_description);
		link.addSelectionListener(new FanTypeFieldsAdapter());
		link.setLayoutData(new GridData(GridData.FILL, GridData.CENTER, false,
				false, nColumns, 1));
		DialogField.createEmptySpace(composite);
		fAddCommentButton.doFillIntoGrid(composite, nColumns - 1);
	}

	protected void setFocus() {
		if (fTypeNameDialogField.isEnabled()) {
			fTypeNameDialogField.setFocus();
		} else {
			setFocusOnContainer();
		}
	}

	private void typePageLinkActivated() {
		IScriptProject project = getProjectFragment().getScriptProject();
		if (project != null) {
			Map<String, String> data = new HashMap<String, String>();
			data.put(CodeTemplatesPreferencePage.DATA_SELECT_TEMPLATE,
					"Fantom Class Comment");
			PreferencesUtil.createPreferenceDialogOn(getShell(),
					FanCodeTemplateArea.PREF_ID,
					new String[] { FanCodeTemplateArea.PREF_ID }, data).open();

		} else {
			String title = FanWizardMessages.NewTypeWizardPage_configure_templates_title;
			String message = FanWizardMessages.NewTypeWizardPage_configure_templates_message;
			MessageDialog.openInformation(getShell(), title, message);
		}
	}

	private void typePageChangeControlPressed(DialogField field) {
		if (field == fFilenameDialogField) {
			fCurrentSourceModule = chooseFilename();
			if (fCurrentSourceModule != null) {
				fFilenameDialogField.setText(fCurrentSourceModule
						.getElementName());
				setScriptFolder(
						(IScriptFolder) fCurrentSourceModule.getParent(), true);
				try {
					lineDelimiter = CodeGeneration
							.getLineDelimiterUsed(fCurrentSourceModule);
				} catch (ModelException e) {
					lineDelimiter = "\n";
				}
			}
		} else if (field == fSuperClassDialogField) {
			IType type = chooseSuperClass();
			if (type != null) {
				fSuperClassDialogField.setText(getQualifiedName(type));
			}
		}
	}

	public static String getQualifiedName(IType type) {
		StringBuffer buf = new StringBuffer();
		IProjectFragment me = (IProjectFragment) type
				.getAncestor(IModelElement.PROJECT_FRAGMENT);
		if ((me.isArchive() || me.isExternal())
				&& me.getPath().getFileExtension().equals(POD_EXTENSION)) {
			String podFileName = me.getPath().lastSegment();
			buf.append(podFileName.substring(0, podFileName.lastIndexOf('.')))
					.append("::");
		}
		buf.append(type.getTypeQualifiedName("."));
		return buf.toString();
	}

	@SuppressWarnings("unchecked")
	private void typePageCustomButtonPressed(DialogField field, int index) {
		if (field == fSuperMixinsDialogField && index == 0) {
			chooseSuperMixins();
			List mixins = fSuperMixinsDialogField.getElements();
			if (!mixins.isEmpty()) {
				Object element = mixins.get(mixins.size() - 1);
				fSuperMixinsDialogField.editElement(element);
			}
		}
	}

	private void typePageDialogFieldChanged(DialogField field) {
		String fieldName = null;
		if (field == fFilenameDialogField) {
			fFilenameStatus = filenameChanged();
			fieldName = FILENAME;
		} else if (field == fFilenameExistingSelection) {
			updateEnableState();
			fieldName = FILENAMESELECTION;
		} else if (field == fTypeNameDialogField) {
			fTypeNameStatus = typeNameChanged();
			fieldName = TYPENAME;
		} else if (field == fSuperClassDialogField) {
			fSuperClassStatus = superClassChanged();
			fieldName = SUPER;
		} else if (field == fSuperMixinsDialogField) {
			fSuperMixinsStatus = superMixinsChanged();
			fieldName = MIXINS;
		} else if (field == fOtherMdfButtons || field == fAccMdfButtons) {
			fModifierStatus = modifiersChanged();
			fieldName = MODIFIERS;
		} else {
			fieldName = METHODS;
		}
		// tell all others
		handleFieldChanged(fieldName);
	}

	@Override
	protected void handleFieldChanged(String fieldName) {
		super.handleFieldChanged(fieldName);
		if (fieldName == CONTAINER) {
			// IProjectFragment fragment = getProjectFragment();
			// if (fragment != null)
			//				currentScriptFolder = fragment.getScriptFolder(""); //$NON-NLS-1$
			// else
			// currentScriptFolder = null;
			currentScriptFolder = getScriptFolder();
			fFilenameStatus = filenameChanged();
			fTypeNameStatus = typeNameChanged();
			fSuperClassStatus = superClassChanged();
			fSuperMixinsStatus = superMixinsChanged();
		}
	}

	public String getFilename() {
		return fFilenameDialogField.getText();
	}

	public void setFilename(String filename, boolean canBeModified) {
		fCanModifyFilename = canBeModified;
		String str = (filename == null) ? "" : filename;
		fFilenameDialogField.setText(str);
		updateEnableState();
	}

	public boolean isFilenameExistingSelected() {
		return fFilenameExistingSelection.isSelected();
	}

	public void setFilenameExistingSelection(boolean isSelected,
			boolean canBeModified) {
		fFilenameExistingSelection.setSelection(isSelected);
		fFilenameExistingSelection.setEnabled(canBeModified);
		updateEnableState();
	}

	public String getTypeName() {
		return fTypeNameDialogField.getText();
	}

	public void setTypeName(String name, boolean canBeModified) {
		fTypeNameDialogField.setText(name);
		fTypeNameDialogField.setEnabled(canBeModified);
	}

	public int getModifiers() {
		int mdf = 0;
		if (fAccMdfButtons.isSelected(PUBLIC_INDEX)) {
			mdf += F_PUBLIC;
		} else if (fAccMdfButtons.isSelected(INTERNAL_INDEX)) {
			mdf += F_INTERNAL;
		}

		if (fTypeKind == CLASS_TYPE) {
			if (fOtherMdfButtons.isSelected(ABSTRACT_INDEX)) {
				mdf += F_ABSTRACT;
			}
			if (fOtherMdfButtons.isSelected(FINAL_INDEX)) {
				mdf += F_FINAL;
			}
			if (fOtherMdfButtons.isSelected(CONST_INDEX)) {
				mdf += F_CONST;
			}
		} else if (fTypeKind == MIXIN_TYPE) {
			if (fOtherMdfButtons.isSelected(CONST_INDEX_MIXIN)) {
				mdf += F_CONST;
			}
		}

		return mdf;
	}

	public void setModifiers(int modifiers, boolean canBeModified) {
		if (FanModifiers.isPublic(modifiers)) {
			fAccMdfButtons.setSelection(PUBLIC_INDEX, true);
		} else if (FanModifiers.isInternal(modifiers)) {
			fAccMdfButtons.setSelection(INTERNAL_INDEX, true);
		} else {
			fAccMdfButtons.setSelection(DEFAULT_INDEX, true);
		}
		if (FanModifiers.isAbstract(modifiers)) {
			fOtherMdfButtons.setSelection(ABSTRACT_INDEX, true);
		}
		if (FanModifiers.isFinal(modifiers)) {
			fOtherMdfButtons.setSelection(FINAL_INDEX, true);
		}
		if (FanModifiers.isConst(modifiers)) {
			fOtherMdfButtons.setSelection(CONST_INDEX, true);
		}

		fAccMdfButtons.setEnabled(canBeModified);
		fOtherMdfButtons.setEnabled(canBeModified);
	}

	public String getSuperClass() {
		String superclassQualified = fSuperClassDialogField.getText();
		int pos = fSuperClassDialogField.getText().lastIndexOf("::");
		if (pos != -1)
			return superclassQualified.substring(pos + 2);
		else
			return superclassQualified;
	}

	public String getSuperClassQualified() {
		return fSuperClassDialogField.getText();
	}

	public void setSuperClass(String name, boolean canBeModified) {
		fSuperClassDialogField.setText(name);
		fSuperClassDialogField.setEnabled(canBeModified);
	}

	@SuppressWarnings("unchecked")
	public List getSuperMixins() {
		List mixins = fSuperMixinsDialogField.getElements();
		ArrayList result = new ArrayList(mixins.size());
		for (Iterator iter = mixins.iterator(); iter.hasNext();) {
			MixinWrapper wrapper = (MixinWrapper) iter.next();
			result.add(wrapper.mixinName);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<String> getSuperMixinsQualified() {
		List mixins = fSuperMixinsDialogField.getElements();
		ArrayList result = new ArrayList(mixins.size());
		for (Iterator iter = mixins.iterator(); iter.hasNext();) {
			MixinWrapper wrapper = (MixinWrapper) iter.next();
			result.add(wrapper.mixinQualifiedName);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public void setSuperMixins(List mixinsNames, boolean canBeModified) {
		ArrayList mixins = new ArrayList(mixinsNames.size());
		for (Iterator iter = mixinsNames.iterator(); iter.hasNext();) {
			mixins.add(new MixinWrapper((String) iter.next()));
		}
		fSuperMixinsDialogField.setElements(mixins);
		fSuperMixinsDialogField.setEnabled(canBeModified);
	}

	public boolean addSuperMixin(String superMixin) {
		return fSuperMixinsDialogField.addElement(new MixinWrapper(superMixin));
	}

	public void setAddComments(boolean doAddComments, boolean canBeModified) {
		fAddCommentButton.setSelection(doAddComments);
		fAddCommentButton.setEnabled(canBeModified);
	}

	public void enableCommentControl(boolean useAddCommentValue) {
		fUseAddCommentButtonValue = useAddCommentValue;
	}

	public boolean isAddComments() {
		if (fUseAddCommentButtonValue) {
			return fAddCommentButton.isSelected();
		}
		return false;
	}

	@Override
	protected IStatus containerChanged() {
		return super.containerChanged();
	}

	private void updateEnableState() {
		boolean existing = fFilenameExistingSelection.isSelected();
		fFilenameDialogField.getTextControl().setEnabled(fCanModifyFilename);
		fFilenameDialogField.setText("");
		fFilenameDialogField.getTextControl().setEditable(!existing);
		fFilenameDialogField.enableButton(fCanModifyFilename && existing);
	}

	protected IStatus filenameChanged() {
		StatusInfo status = new StatusInfo();

		if (getFilename().length() == 0) {
			status.setError(FanWizardMessages.NewTypeWizardPage_fileNameCannotBeEmpty);
		} else {
			if (!Path.EMPTY.isValidSegment(getFilename())) {
				status.setError(FanWizardMessages.NewTypeWizardPage_invalidFileName);
			}
			if (currentScriptFolder != null) {
				ISourceModule module = currentScriptFolder
						.getSourceModule(getFilename());
				IResource resource = module.getResource();
				if (module.exists() && !isFilenameExistingSelected()) {
					status.setError(FanWizardMessages.NewTypeWizardPage_fileAlreadyExists);
				} else if (resource != null && !isFilenameExistingSelected()) {
					URI location = resource.getLocationURI();
					if (location != null) {
						try {
							IFileStore store = EFS.getStore(location);
							if (store.fetchInfo().exists()) {
								status.setError(NewWizardMessages.NewTypeWizardPage_error_TypeNameExistsDifferentCase);
								return status;
							}
						} catch (CoreException e) {
							status.setError(NewWizardMessages.NewTypeWizardPage_error_uri_location_unkown);
						}
					}
				}
			}
		}

		return status;
	}

	protected IStatus typeNameChanged() {
		StatusInfo status = new StatusInfo();
		final String typeName = getTypeName();
		// must not be empty
		if (typeName.length() == 0) {
			status.setError(FanWizardMessages.NewTypeWizardPage_typeNameCannotBeEmpty);
			return status;
		}

		if (!isFilenameExistingSelected())
			fFilenameDialogField.setText(fTypeNameDialogField.getText()
					+ ".fan");

		IScriptProject project = getProjectFragment().getScriptProject();
		IStatus val = validateFanTypeName(typeName, project);
		if (val.getSeverity() == IStatus.ERROR) {
			status.setError(NLS.bind(
					FanWizardMessages.NewTypeWizardPage_error_InvalidTypeName,
					val.getMessage()));
			return status;
		} else if (val.getSeverity() == IStatus.WARNING) {
			status.setWarning(NLS
					.bind(FanWizardMessages.NewTypeWizardPage_warning_TypeNameDiscouraged,
							val.getMessage()));
		}

		// must not exist

		final List<IModelElement> availableTypes = new ArrayList<IModelElement>();
		TypeNameMatchRequestor requestor = new TypeNameMatchRequestor() {
			@Override
			public void acceptTypeNameMatch(TypeNameMatch match) {
				SourceParserUtil.getModuleDeclaration(match.getType()
						.getSourceModule());
				IProjectFragment me = (IProjectFragment) match.getType()
						.getAncestor(IModelElement.PROJECT_FRAGMENT);
				if (match.getType().getElementName().equals(typeName)
						&& !me.isArchive() && !me.isExternal())
					availableTypes.add(match.getType());
			}
		};
		// ScriptModelUtil.searchTypeDeclarations(project, typeName, requestor);
		// if (!availableTypes.isEmpty()) {
		// status
		// .setError(FanWizardMessages.NewTypeWizardPage_error_TypeNameExists);
		// return status;
		// }
		return status;
	}

	private IStatus validateFanTypeName(String typeName, IScriptProject project) {
		StatusInfo status = new StatusInfo();

		return status;
	}

	protected IStatus superClassChanged() {
		StatusInfo status = new StatusInfo();
		// IPackageFragmentRoot root= getPackageFragmentRoot();
		// fSuperClassDialogField.enableButton(root != null);
		//
		// fSuperClassStubTypeContext= null;
		//
		// String sclassName= getSuperClass();
		// if (sclassName.length() == 0) {
		// // accept the empty field (stands for java.lang.Object)
		// return status;
		// }
		//
		// if (root != null) {
		// Type type= TypeContextChecker.parseSuperClass(sclassName);
		// if (type == null) {
		// status.setError(NewWizardMessages.NewTypeWizardPage_error_InvalidSuperClassName);
		// return status;
		// }
		// if (type instanceof ParameterizedType && !
		// JavaModelUtil.is50OrHigher(root.getJavaProject())) {
		// status.setError(NewWizardMessages.NewTypeWizardPage_error_SuperClassNotParameterized);
		// return status;
		// }
		// } else {
		//			status.setError(""); //$NON-NLS-1$
		// }
		return status;
	}

	// private StubTypeContext getSuperClassStubTypeContext() {
	// if (fSuperClassStubTypeContext == null) {
	// String typeName;
	// if (fCurrType != null) {
	// typeName= getTypeName();
	// } else {
	// typeName= JavaTypeCompletionProcessor.DUMMY_CLASS_NAME;
	// }
	// fSuperClassStubTypeContext=
	// TypeContextChecker.createSuperClassStubTypeContext(typeName,
	// getEnclosingType(), getPackageFragment());
	// }
	// return fSuperClassStubTypeContext;
	// }

	protected IStatus superMixinsChanged() {
		StatusInfo status = new StatusInfo();

		// IPackageFragmentRoot root= getPackageFragmentRoot();
		// fSuperInterfacesDialogField.enableButton(0, root != null);
		//
		// if (root != null) {
		// List elements= fSuperInterfacesDialogField.getElements();
		// int nElements= elements.size();
		// for (int i= 0; i < nElements; i++) {
		// String intfname= ((InterfaceWrapper) elements.get(i)).interfaceName;
		// Type type= TypeContextChecker.parseSuperInterface(intfname);
		// if (type == null) {
		// status.setError(Messages.format(NewWizardMessages.NewTypeWizardPage_error_InvalidSuperInterfaceName,
		// BasicElementLabels.getJavaElementName(intfname)));
		// return status;
		// }
		// if (type instanceof ParameterizedType && !
		// JavaModelUtil.is50OrHigher(root.getJavaProject())) {
		// status.setError(Messages.format(NewWizardMessages.NewTypeWizardPage_error_SuperInterfaceNotParameterized,
		// BasicElementLabels.getJavaElementName(intfname)));
		// return status;
		// }
		// }
		// }
		return status;
	}

	// private StubTypeContext getSuperInterfacesStubTypeContext() {
	// if (fSuperInterfaceStubTypeContext == null) {
	// String typeName;
	// if (fCurrType != null) {
	// typeName= getTypeName();
	// } else {
	// typeName= JavaTypeCompletionProcessor.DUMMY_CLASS_NAME;
	// }
	// fSuperInterfaceStubTypeContext=
	// TypeContextChecker.createSuperInterfaceStubTypeContext(typeName,
	// getEnclosingType(), getPackageFragment());
	// }
	// return fSuperInterfaceStubTypeContext;
	// }

	protected IStatus modifiersChanged() {
		StatusInfo status = new StatusInfo();
		int modifiers = getModifiers();
		if (FanModifiers.isFinal(modifiers)
				&& FanModifiers.isAbstract(modifiers)) {
			status.setError(FanWizardMessages.NewTypeWizardPage_error_ModifiersFinalAndAbstract);
		}
		return status;
	}

	protected ISourceModule chooseFilename() {
		ScriptExplorerContentProvider provider = new ScriptExplorerContentProvider(
				false);
		ILabelProvider labelProvider = new ScriptExplorerLabelProvider(
				provider, FanUI.getDefault().getPreferenceStore());
		ElementTreeSelectionDialog dialog = new ElementTreeSelectionDialog(
				getShell(), labelProvider, provider);
		dialog.setTitle(DLTKLaunchConfigurationsMessages.mainTab_searchButton_title);
		dialog.setMessage(DLTKLaunchConfigurationsMessages.mainTab_searchButton_message);
		IScriptProject proj = getProjectFragment().getScriptProject();
		if (proj == null)
			return null;
		dialog.addFilter(new FanScriptFileFilter("fan"));
		dialog.setInput(proj);
		dialog.setComparator(new ResourceComparator(ResourceComparator.NAME));
		dialog.setAllowMultiple(false);
		if (dialog.open() == IDialogConstants.OK_ID) {
			return (ISourceModule) dialog.getFirstResult();
		}
		return null;
	}

	protected IType chooseSuperClass() {
		IScriptProject project = getProjectFragment().getScriptProject();
		if (project == null) {
			return null;
		}

		IDLTKSearchScope scope = SearchEngine.createSearchScope(project);
		FilteredTypesSelectionDialog dialog = new FilteredTypesSelectionDialog(
				getShell(), false, PlatformUI.getWorkbench()
						.getProgressService(), scope,
				IDLTKSearchConstants.TYPE, new FanTypeSelectionExtension(),
				FanLanguageToolkit.getDefault());
		dialog.setMessage(FanWizardMessages.NewTypeWizardPage_superClassDialog_message);
		dialog.setInitialPattern(getSuperClass());
		dialog.setTitle(FanWizardMessages.NewTypeWizardPage_superClassDialog_title);
		if (dialog.open() == IDialogConstants.OK_ID) {
			Object[] types = dialog.getResult();
			if (types != null && types.length > 0) {
				IType type = (IType) types[0];
				return type;
			}
		}

		return null;
	}

	protected void chooseSuperMixins() {
		IScriptProject project = getProjectFragment().getScriptProject();
		if (project == null) {
			return;
		}

		SuperMixinSelectionDialog dialog = new SuperMixinSelectionDialog(
				getShell(), getWizard().getContainer(), this, project);
		dialog.setTitle(getMixinDialogTitle());
		dialog.setMessage(FanWizardMessages.NewTypeWizardPage_mixinsDialog_message);
		dialog.open();
	}

	private String getMixinDialogTitle() {
		if (fTypeKind == MIXIN_TYPE)
			return FanWizardMessages.NewTypeWizardPage_mixinsDialog_mixin_title;
		return FanWizardMessages.NewTypeWizardPage_mixinsDialog_class_title;
	}

	public void createType(IProgressMonitor monitor) throws CoreException,
			InterruptedException {
		if (monitor == null) {
			monitor = new NullProgressMonitor();
		}

		monitor.beginTask(FanWizardMessages.NewTypeWizardPage_operationdesc, 3);

		if (!isFilenameExistingSelected()) {
			fCurrentSourceModule = createFile(monitor);
			lineDelimiter = CodeGeneration
					.getLineDelimiterUsed(fCurrentSourceModule);
		} else {
			ISourceModule workingCopy;
			if (!fCurrentSourceModule.isWorkingCopy())
				workingCopy = fCurrentSourceModule
						.getWorkingCopy(new NullProgressMonitor());
			else
				workingCopy = fCurrentSourceModule;
			IBuffer buffer = workingCopy.getBuffer();
			if (buffer != null) {
				if (!buffer.getContents().endsWith(lineDelimiter))
					buffer.append(lineDelimiter);
				buffer.append(lineDelimiter);

				String comment = "";
				if (isAddComments()) {
					try {
						comment += getTypeComment(fCurrentSourceModule);
					} catch (CoreException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				buffer.append(comment);
				buffer.append(getTypeContent());
			}

			UsingsManager usingManager = new UsingsManager(workingCopy, false);
			usingManager.addUsing(getSuperClassQualified(), false);
			usingManager.addUsings(getSuperMixinsQualified(), false);
			usingManager.appendUsings();

			workingCopy.commitWorkingCopy(false, new NullProgressMonitor());
		}

		monitor.worked(1);

		monitor.worked(1);

		fCreatedType = new SourceType(
				(ModelElement) fCurrentSourceModule.getPrimaryElement(),
				getTypeName());

		monitor.done();
	}

	public ISourceModule getCreatedOrModifiedModule() {
		return fCurrentSourceModule;
	}

	public IModelElement getCreatedType() {
		return fCreatedType;
	}

	@Override
	protected String getRequiredNature() {
		return FanNature.NATURE_ID;
	}

	public ISourceModule createFile(IProgressMonitor monitor)
			throws CoreException {
		if (monitor == null) {
			monitor = new NullProgressMonitor();
		}

		final String fileName = getFileNameWithExtension();
		final ISourceModule module = currentScriptFolder
				.getSourceModule(fileName);
		currentScriptFolder.createSourceModule(fileName,
				getFileContent(module), true, monitor);

		return module;
	}

	protected String getFileContent(ISourceModule module) {
		UsingsManager usingManager = new UsingsManager(module, false);
		usingManager.addUsing(getSuperClassQualified(), false);
		usingManager.addUsings(getSuperMixinsQualified(), false);

		String comment = "";
		if (isAddComments()) {
			try {
				comment += getFileComment(module);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String typeComment = "";
		if (isAddComments()) {
			try {
				typeComment += getTypeComment(module);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return comment + usingManager.getUsings() + lineDelimiter + typeComment
				+ getTypeContent();
	}

	protected String getFileNameWithExtension() {
		final String fileText = getFilename();

		String[] extensions = getFileExtensions();
		for (int i = 0; i < extensions.length; ++i) {
			String extension = extensions[i];
			if (extension.length() > 0 && fileText.endsWith("." + extension)) { //$NON-NLS-1$
				return fileText;
			}
		}

		return fileText + "." + extensions[0]; //$NON-NLS-1$
	}

	protected String[] getFileExtensions() {
		String requiredNature = getRequiredNature();

		IDLTKLanguageToolkit toolkit = DLTKLanguageManager
				.getLanguageToolkit(requiredNature);
		final String[] extensions = ScriptModelUtil.getFileExtensions(toolkit);
		if (extensions != null) {
			return extensions;
		}
		return new String[] { Util.EMPTY_STRING };
	}

	protected String getTypeContent() {
		return constructImports(lineDelimiter)
				+ constructTypeStub(lineDelimiter);
	}

	private String constructImports(String lineDelimiter) {
		return "";
	}

	private String writeSuperClass() {
		StringBuffer buf = new StringBuffer();
		String superclass = getSuperClass();
		if (fTypeKind == CLASS_TYPE && superclass.length() > 0
				&& !"Obj".equals(superclass)) {
			buf.append(" : ").append(superclass);
		}
		return buf.toString();
	}

	@SuppressWarnings("unchecked")
	private String writeSuperInterfaces(boolean superClassAdded) {
		StringBuffer buf = new StringBuffer();
		List<String> mixins = getSuperMixins();
		int last = mixins.size() - 1;
		if (last >= 0) {
			buf.append(superClassAdded ? ", " : " : ");
			String[] intfs = mixins.toArray(new String[mixins.size()]);
			for (int i = 0; i <= last; i++) {
				buf.append(intfs[i].substring(intfs[i].lastIndexOf('/') + 1));
				if (i < last) {
					buf.append(", ");
				}
			}
		}
		return buf.toString();
	}

	@SuppressWarnings("unused")
	private String constructSimpleTypeStub(String lineDelimiter) {
		StringBuffer buf = new StringBuffer("public class ");
		buf.append(getTypeName());
		buf.append("\n{\n\n}\n");
		return buf.toString();
	}

	private String constructTypeStub(String lineDelimiter) {
		StringBuffer buf = new StringBuffer();

		int modifiers = getModifiers();
		buf.append(FanModifiers.toString(modifiers));
		if (modifiers != 0) {
			buf.append(' ');
		}
		String type = "";
		switch (fTypeKind) {
		case CLASS_TYPE:
			type = "class ";
			break;
		case MIXIN_TYPE:
			type = "mixin ";
			break;
		case ENUM_TYPE:
			type = "enum class ";
			break;
		}
		buf.append(type);
		buf.append(getTypeName());
		String superclass = writeSuperClass();
		buf.append(superclass);
		buf.append(writeSuperInterfaces(superclass.length() > 0));

		buf.append(lineDelimiter).append("{").append(lineDelimiter);
		String typeBody = getTypeBody(getTypeName(), lineDelimiter);
		if (typeBody != null) {
			buf.append(typeBody);
		} else {
			buf.append(lineDelimiter);
		}
		buf.append("}").append(lineDelimiter);
		return buf.toString();
	}

	protected String getTypeBody(String typeName, String lineDelimiter) {
		return null;
	}

	protected String getFileComment(ISourceModule module) throws CoreException {
		final ICodeTemplateArea templateArea = new FanCodeTemplateArea();
		if (templateArea != null) {

			final TemplateStore store = templateArea.getTemplateAccess()
					.getTemplateStore();
			Template[] templates = store
					.getTemplates(FanCodeTemplateAccess.FILES_CONTEXT_ID);

			final Template template = templates[0];
			if (template != null) {
				final TemplateContextType contextType = templateArea
						.getTemplateAccess().getContextTypeRegistry()
						.getContextType(template.getContextTypeId());
				// TODO introduce a way to create context by contextType
				final SourceModuleTemplateContext context = new SourceModuleTemplateContext(
						contextType,
						CodeGeneration.getLineDelimiterUsed(module));
				context.setSourceModuleVariables(module);
				final String[] fullLine = {};
				final String result = CodeGeneration.evaluateTemplate(context,
						template, fullLine);
				return result != null ? result : Util.EMPTY_STRING;
			}
		}
		return Util.EMPTY_STRING;
	}

	protected String getTypeComment(ISourceModule module) throws CoreException {
		final ICodeTemplateArea templateArea = new FanCodeTemplateArea();
		if (templateArea != null) {

			final TemplateStore store = templateArea.getTemplateAccess()
					.getTemplateStore();
			Template[] templates = store
					.getTemplates(FanCodeTemplateAccess.TYPES_CONTEXT_ID);

			final Template template = templates[0];
			if (template != null) {
				final TemplateContextType contextType = templateArea
						.getTemplateAccess().getContextTypeRegistry()
						.getContextType(template.getContextTypeId());
				// TODO introduce a way to create context by contextType
				final SourceModuleTemplateContext context = new SourceModuleTemplateContext(
						contextType,
						CodeGeneration.getLineDelimiterUsed(module));
				context.setSourceModuleVariables(module);
				final String[] fullLine = {};
				final String result = CodeGeneration.evaluateTemplate(context,
						template, fullLine);
				return result != null ? result : Util.EMPTY_STRING;
			}
		}
		return Util.EMPTY_STRING;
	}

	protected String getFileContent() {
		return Util.EMPTY_STRING;
	}

	// protected String getFileComment(ICompilationUnit parentCU,
	// String lineDelimiter) throws CoreException {
	// if (isAddComments()) {
	// return CodeGeneration.getFileComment(parentCU, lineDelimiter);
	// }
	// return null;
	//
	// }
	//
	// protected String getTypeComment(ICompilationUnit parentCU,
	// String lineDelimiter) {
	// if (isAddComments()) {
	// try {
	// StringBuffer typeName = new StringBuffer();
	// // if (isEnclosingTypeSelected()) {
	// // typeName.append(
	// // getEnclosingType().getTypeQualifiedName('.'))
	// // .append('.');
	// // }
	// typeName.append(getTypeNameWithoutParameters());
	// String[] typeParamNames = new String[0];
	// String comment = CodeGeneration.getTypeComment(parentCU,
	// typeName.toString(), typeParamNames, lineDelimiter);
	// if (comment != null && isValidComment(comment)) {
	// return comment;
	// }
	// } catch (CoreException e) {
	// JavaPlugin.log(e);
	// }
	// }
	// return null;
	// }

	// protected String getTypeComment(ICompilationUnit parentCU) {
	// if (StubUtility.doAddComments(parentCU.getJavaProject()))
	// return getTypeComment(parentCU,
	// StubUtility.getLineDelimiterUsed(parentCU));
	// return null;
	// }

	// protected String getTemplate(String name, ICompilationUnit parentCU) {
	// return getTemplate(name, parentCU, 0);
	// }

}
