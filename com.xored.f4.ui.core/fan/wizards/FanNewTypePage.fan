using [java] java.util::ArrayList

using [java] org.eclipse.osgi.util::NLS
using [java] org.eclipse.swt::SWT
using [java] org.eclipse.swt.events::SelectionEvent
using [java] org.eclipse.swt.events::SelectionListener
using [java] org.eclipse.swt.graphics::Image
using [java] org.eclipse.swt.layout::GridData
using [java] org.eclipse.swt.layout::GridLayout
using [java] org.eclipse.swt.widgets::Composite
using [java] org.eclipse.swt.widgets::Control
using [java] org.eclipse.swt.widgets::Link
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.core.runtime::IStatus
using [java] org.eclipse.core.runtime::NullProgressMonitor
using [java] org.eclipse.core.runtime::Path
using [java] org.eclipse.core.filesystem::EFS
using [java] org.eclipse.ui::PlatformUI
using [java] org.eclipse.ui.dialogs::ElementTreeSelectionDialog
using [java] org.eclipse.ui.dialogs::PreferencesUtil
using [java] org.eclipse.ui.views.navigator::ResourceComparator
using [java] org.eclipse.jface.dialogs::IDialogConstants
using [java] org.eclipse.jface.dialogs::IDialogSettings
using [java] org.eclipse.jface.dialogs::MessageDialog
using [java] org.eclipse.jface.text.templates::Template
using [java] org.eclipse.jface.viewers::IStructuredSelection
using [java] org.eclipse.jface.viewers::LabelProvider
using [java] org.eclipse.dltk.core::DLTKLanguageManager
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::IProjectFragment
using [java] org.eclipse.dltk.core::IScriptFolder
using [java] org.eclipse.dltk.core::IScriptProject
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.core::IType
using [java] org.eclipse.dltk.core::ScriptModelUtil
using [java] org.eclipse.dltk.core.search::IDLTKSearchConstants
using [java] org.eclipse.dltk.core.search::SearchEngine
using [java] org.eclipse.dltk.debug.ui.messages::DLTKLaunchConfigurationsMessages
using [java] org.eclipse.dltk.ui::DLTKPluginImages
using [java] org.eclipse.dltk.ui.dialogs::FilteredTypesSelectionDialog
using [java] org.eclipse.dltk.ui.dialogs::StatusInfo
using [java] org.eclipse.dltk.ui.preferences::CodeTemplatesPreferencePage
using [java] org.eclipse.dltk.ui.text.templates::SourceModuleTemplateContext
using [java] org.eclipse.dltk.ui.util::CodeGeneration
using [java] org.eclipse.dltk.ui.viewsupport::BasicElementLabels
using [java] org.eclipse.dltk.ui.wizards::NewContainerWizardPage
using "[java]org.eclipse.dltk.internal.core"::SourceType
using "[java]org.eclipse.dltk.internal.ui.dialogs"::TextFieldNavigationHandler
using "[java]org.eclipse.dltk.internal.ui.navigator"::ScriptExplorerContentProvider
using "[java]org.eclipse.dltk.internal.ui.navigator"::ScriptExplorerLabelProvider
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::IDialogFieldListener
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::IListAdapter
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::IStringButtonAdapter
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::DialogField
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::LayoutUtil
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::ListDialogField
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::ListDialogField$ColumnsDescription as ColumnsDescription
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::SelectionButtonDialogField
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::SelectionButtonDialogFieldGroup
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::Separator
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::StringButtonDialogField
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::StringDialogField

using [java] com.xored.fanide.core::FanLanguageToolkit
using [java] com.xored.fanide.core.utils::FanUsing
using [java] com.xored.fanide.ui::FanPreferenceConstants
using "[java]com.xored.fanide.internal.ui"::FanUILanguageToolkit
using "[java]com.xored.fanide.internal.ui.dialogs"::FanTypeSelectionExtension
using "[java]com.xored.fanide.internal.ui.filters"::FanScriptFileFilter
using "[java]com.xored.fanide.internal.ui.preferences"::NewWizardMessages
using "[java]com.xored.fanide.internal.ui.wizards"::FanWizardMessages

using f4core

class FanNewTypePage : NewContainerWizardPage
{
	IType? createdType { private set }
	ISourceModule? currentSourceModule { private set }
	private Str lineDelimiter := "\n"
	private IScriptFolder? currentScriptFolder

  private static const Str pageName := "com.xored.fanide.ui.FanNewTypeWizardPage"
	protected static const Str filenameId := pageName + ".filename"
	protected static const Str filenameSelectionId := filenameId + ".existing"
	protected static const Str typenameId := pageName + ".typename"
	protected static const Str superId := pageName + ".superclass"
	protected static const Str mixinsId := pageName + ".mixins"
	protected static const Str modifiersId := pageName + ".modifiers"
	protected static const Str methodsId := pageName + ".methods"

	private SelectionButtonDialogField filenameExistingSelection
	private StringButtonDialogField filenameDialogField
	private Bool canModifyFilename
  
	private StringDialogField typeNameDialogField
	private StringButtonDialogField superClassDialogField
	private ListDialogField superMixinsDialogField
	
  private SelectionButtonDialogFieldGroup accMdfButtons
	private SelectionButtonDialogFieldGroup otherMdfButtons

  private SelectionButtonDialogField addCommentButton
  private Bool useAddCommentButtonValue
//
//	// private JavaPackageCompletionProcessor fCurrPackageCompletionProcessor;
//	// private JavaTypeCompletionProcessor fEnclosingTypeCompletionProcessor;
//	// private StubTypeContext fSuperClassStubTypeContext;
//	// private StubTypeContext fSuperInterfaceStubTypeContext;
//
	protected IStatus filenameStatus
	protected IStatus typeNameStatus
	protected IStatus superClassStatus
  protected IStatus superMixinsStatus
	protected IStatus modifierStatus
//
	private static const Int publicIdx := 0
  private static const Int internalIdx := 1
  private static const Int defaultIdx := 2
	private static const Int abstractIdx := 0
  private static const Int finalIdx := 1
  private static const Int constIdx := 2
  
  private TypeKind typeKind
  private FanNewTypePageHelper helper
  
	new make(FanNewTypePageHelper helper) : super(helper.pageName)
  {
    this.helper = helper
		typeKind = helper.typeKind

		adapter := FanTypeFieldsAdapter(this)

		filenameExistingSelection = SelectionButtonDialogField(SWT.CHECK)
		filenameExistingSelection.setDialogFieldListener(adapter)
		filenameExistingSelection.setLabelText(FanWizardMessages.NewTypeWizardPage_filename_existing_selection_label)

		filenameDialogField = StringButtonDialogField(adapter)
		filenameDialogField.setDialogFieldListener(adapter)
		filenameDialogField.setButtonLabel(FanWizardMessages.NewTypeWizardPage_filename_button)
		filenameDialogField.setLabelText(FanWizardMessages.NewTypeWizardPage_filename_label)

		typeNameDialogField = StringDialogField()
		typeNameDialogField.setDialogFieldListener(adapter)
		typeNameDialogField.setLabelText(getTypeNameLabel)

		superClassDialogField = StringButtonDialogField(adapter)
		superClassDialogField.setDialogFieldListener(adapter)
		superClassDialogField.setLabelText(getSuperClassLabel)
		superClassDialogField.setButtonLabel(FanWizardMessages.NewTypeWizardPage_superclass_button)

		addButtons := [FanWizardMessages.NewTypeWizardPage_mixins_add,
				null, FanWizardMessages.NewTypeWizardPage_mixins_remove]
		superMixinsDialogField = ListDialogField(adapter, addButtons, MixinsListLabelProvider())
		superMixinsDialogField.setDialogFieldListener(adapter)
		superMixinsDialogField.setTableColumns(ColumnsDescription(1, false))
		superMixinsDialogField.setLabelText(getSuperMixinsLabel)
		superMixinsDialogField.setRemoveButtonIndex(2)

		buttonNames1 := [
				FanWizardMessages.NewTypeWizardPage_labelModifiersPublic,
				FanWizardMessages.NewTypeWizardPage_labelModifiersInternal,
				FanWizardMessages.NewTypeWizardPage_labelModifiersDefault ]
		accMdfButtons = SelectionButtonDialogFieldGroup(SWT.RADIO, buttonNames1, 3)
		accMdfButtons.setDialogFieldListener(adapter)
		accMdfButtons.setLabelText(getModifiersLabel)
		accMdfButtons.setSelection(0, false)

		Str[]? buttonNames2
    switch (typeKind)
    {
    case TypeKind.classType:
	    buttonNames2 = [
					FanWizardMessages.NewTypeWizardPage_labelModifiersAbstract,
					FanWizardMessages.NewTypeWizardPage_labelModifiersFinal,
					FanWizardMessages.NewTypeWizardPage_labelModifiersConst]
    case TypeKind.mixinType:
			buttonNames2 = [FanWizardMessages.NewTypeWizardPage_labelModifiersConst]
		default:
			buttonNames2 = [,]
    }

    otherMdfButtons = SelectionButtonDialogFieldGroup(SWT.CHECK, buttonNames2, 3)
		otherMdfButtons.setDialogFieldListener(adapter)

		addCommentButton = SelectionButtonDialogField(SWT.CHECK)
		addCommentButton.setLabelText(FanWizardMessages.NewTypeWizardPage_addcomment_label)

		useAddCommentButtonValue = false

		// fCurrPackageCompletionProcessor= new
		// JavaPackageCompletionProcessor();
		// fEnclosingTypeCompletionProcessor= new
		// JavaTypeCompletionProcessor(false, false, true);

		filenameStatus = StatusInfo()

		canModifyFilename = true

		typeNameStatus = StatusInfo()
		superClassStatus = StatusInfo()
		superMixinsStatus = StatusInfo()
		modifierStatus = StatusInfo()

		setModifiers(Modifiers(FanModifiers.AccDefault), true)
	}
  
  Void init(IStructuredSelection selection)
  {
    helper.init(selection, this)
  }
  
  override IDialogSettings? getDialogSettings() { super.getDialogSettings }
  override IModelElement? getInitialScriptElement(IStructuredSelection? selection)
  {
    super.getInitialScriptElement(selection)
  }
  
	/**
	 * Initializes all fields provided by the page with a given selection.
	 * 
	 * @param elem
	 *            the selection used to initialize this page or <code>
	 * null</code> if
	 *            no selection was available
	 */
	internal Void initTypePage(IModelElement elem)
  {
    initContainerPage(elem)
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
		setAddComments(FanUILanguageToolkit.getInstance.getPreferenceStore
				.getBoolean(FanPreferenceConstants.CODEGEN_ADD_COMMENTS), true) // from
		// project or workspace
	}
//
//	// private static IStatus validateJavaTypeName(String text, IJavaProject
//	// project) {
//	// if (project == null || !project.exists()) {
//	// return JavaConventions.validateJavaTypeName(text, JavaCore.VERSION_1_3,
//	// JavaCore.VERSION_1_3);
//	// }
//	// return JavaConventionsUtil.validateJavaTypeName(text, project);
//	// }
//
	protected Str getTypeNameLabel() { FanWizardMessages.NewTypeWizardPage_typename_label }
	protected Str getModifiersLabel() { FanWizardMessages.NewTypeWizardPage_modifiers_acc_label }
	protected Str getSuperClassLabel() { FanWizardMessages.NewTypeWizardPage_superclass_label }
	protected Str getSuperMixinsLabel()
  {
		typeKind != TypeKind.mixinType
      ? FanWizardMessages.NewTypeWizardPage_mixins_class_label
      : FanWizardMessages.NewTypeWizardPage_mixins_ifc_label
	}

	internal Void createSeparator(Composite composite, Int nColumns)
  {
		Separator(SWT.SEPARATOR.or(SWT.HORIZONTAL)).doFillIntoGrid(
				composite, nColumns, convertHeightInCharsToPixels(1))
	}
  
  override Void createContainerControls(Composite? composite, Int nColumns)
  {
    super.createContainerControls(composite, nColumns)
  }
  
  override Void initializeDialogUnits(Control? parent)
  {
    super.initializeDialogUnits(parent)
  }
  
  override Void setControl(Control? control)
  {
    super.setControl(control)
  }

	internal Void createFilenameControls(Composite composite, Int nColumns)
  {
		filenameDialogField.doFillIntoGrid(composite, nColumns)

		text := filenameDialogField.getTextControl(composite)
		LayoutUtil.setWidthHint(text, getMaxFieldWidth)
		LayoutUtil.setHorizontalSpan(text, 2)
		LayoutUtil.setHorizontalGrabbing(text)
		TextFieldNavigationHandler.install(text)

		DialogField.createEmptySpace(composite)

		tabGroup := Composite(composite, SWT.NONE)
		layout := GridLayout()
		layout.marginWidth = 0
		layout.marginHeight = 0
		tabGroup.setLayout(layout)
		filenameExistingSelection.doFillIntoGrid(tabGroup, 1)
		updateEnableState
	}

	internal Void createTypeNameControls(Composite composite, Int nColumns)
  {
		typeNameDialogField.doFillIntoGrid(composite, nColumns - 1)
		DialogField.createEmptySpace(composite)

		text := typeNameDialogField.getTextControl(null)
		LayoutUtil.setWidthHint(text, getMaxFieldWidth)
		TextFieldNavigationHandler.install(text)
	}

	internal Void createModifierControls(Composite composite, Int nColumns)
  {
		LayoutUtil.setHorizontalSpan(accMdfButtons.getLabelControl(composite), 1)

		control := accMdfButtons.getSelectionButtonsGroup(composite)
		gd := GridData(GridData.HORIZONTAL_ALIGN_FILL)
		gd.horizontalSpan = nColumns - 2
		control.setLayoutData(gd)

		DialogField.createEmptySpace(composite)

		if (typeKind == TypeKind.classType || typeKind == TypeKind.mixinType)
    {
			DialogField.createEmptySpace(composite)
			control = otherMdfButtons.getSelectionButtonsGroup(composite)
			gd = GridData(GridData.HORIZONTAL_ALIGN_FILL)
			gd.horizontalSpan = nColumns - 2
			control.setLayoutData(gd)

			DialogField.createEmptySpace(composite)
		}
	}

	internal Void createSuperClassControls(Composite composite, Int nColumns)
  {
		superClassDialogField.doFillIntoGrid(composite, nColumns)
		text := superClassDialogField.getTextControl(null)
		LayoutUtil.setWidthHint(text, getMaxFieldWidth)

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
		TextFieldNavigationHandler.install(text)
	}

	internal Void createSuperMixinsControls(Composite composite, Int nColumns)
  {
		superMixinsDialogField.doFillIntoGrid(composite, nColumns);
		tableViewer := superMixinsDialogField.getTableViewer
		tableViewer.setColumnProperties(["mixin"])

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
		GridData gd := superMixinsDialogField.getListControl(null).getLayoutData
		gd.heightHint = convertHeightInCharsToPixels(typeKind == TypeKind.classType ? 3 : 6)
		gd.grabExcessVerticalSpace = false
		gd.widthHint = getMaxFieldWidth
	}

	internal Void createCommentControls(Composite composite, Int nColumns)
  {
		link := Link(composite, SWT.NONE)
		link.setText(FanWizardMessages.NewTypeWizardPage_addcomment_description)
		link.addSelectionListener(FanTypeFieldsAdapter(this))
		link.setLayoutData(GridData(GridData.FILL, GridData.CENTER, false, false, nColumns, 1))
		DialogField.createEmptySpace(composite)
		addCommentButton.doFillIntoGrid(composite, nColumns-1)
	}

	protected Void setFocus()
  {
		if (typeNameDialogField.isEnabled)
			typeNameDialogField.setFocus
		else
			setFocusOnContainer
	}

	internal Void typePageLinkActivated()
  {
		project := getProjectFragment.getScriptProject
		if (project != null)
    {
			data := Str:Str[CodeTemplatesPreferencePage.DATA_SELECT_TEMPLATE:"Fantom Class Comment"]
			PreferencesUtil.createPreferenceDialogOn(getShell,
					FanCodeTemplateArea.prefId,
					[ FanCodeTemplateArea.prefId ], data).open
		}
    else
    {
			MessageDialog.openInformation(getShell,
        FanWizardMessages.NewTypeWizardPage_configure_templates_title,
        FanWizardMessages.NewTypeWizardPage_configure_templates_message)
  	}
	}

  internal Void typePageChangeControlPressed(DialogField field)
  {
		if (field == filenameDialogField)
    {
			currentSourceModule = chooseFilename
			if (currentSourceModule != null)
      {
				filenameDialogField.setText(currentSourceModule.getElementName)
				setScriptFolder(currentSourceModule.getParent, true)
				//try
        //{
					lineDelimiter = CodeGeneration.getLineDelimiterUsed(currentSourceModule)
				//}
        //catch (ModelException e)
				//	lineDelimiter = "\n"
			}
		}
    else if (field == superClassDialogField)
    {
			type := chooseSuperClass
			if (type != null)
				superClassDialogField.setText(getQualifiedName(type))
		}
	}

	static Str getQualifiedName(IType type)
  {
		buf := StrBuf()
		me := (IProjectFragment)type.getAncestor(IModelElement.PROJECT_FRAGMENT)
		if ((me.isArchive || me.isExternal)	&& me.getPath.getFileExtension == "pod")
    {
			podFileName := me.getPath.lastSegment
			buf.add(podFileName[0..podFileName.index(".")]).add("::")
		}
		buf.add(type.getTypeQualifiedName("."))
		return buf.toStr
	}

	internal Void typePageCustomButtonPressed(DialogField field, Int index)
  {
		if (field == superMixinsDialogField && index == 0)
    {
			chooseSuperMixins
			mixins := superMixinsDialogField.getElements
			if (!mixins.isEmpty)
      {
				element := mixins.get(mixins.size-1)
				superMixinsDialogField.editElement(element)
			}
		}
	}

	internal Void typePageDialogFieldChanged(DialogField field)
  {
		Str? fieldName := null
    switch (field) {
    case filenameDialogField:
			filenameStatus = filenameChanged
			fieldName = filenameId
		case filenameExistingSelection:
			updateEnableState
			fieldName = filenameSelectionId
		case typeNameDialogField:
			typeNameStatus = typeNameChanged
			fieldName = typenameId
		case superClassDialogField:
			superClassStatus = superClassChanged
			fieldName = superId
		case superMixinsDialogField:
			superMixinsStatus = superMixinsChanged
			fieldName = mixinsId
		case otherMdfButtons:
    case accMdfButtons:
			modifierStatus = modifiersChanged
			fieldName = modifiersId
		default:
			fieldName = methodsId
		}
		// tell all the others
		handleFieldChanged(fieldName)
	}

	override protected Void handleFieldChanged(Str? fieldName)
  {
		super.handleFieldChanged(fieldName)
		if (fieldName == CONTAINER)
    {
			// IProjectFragment fragment = getProjectFragment();
			// if (fragment != null)
			//				currentScriptFolder = fragment.getScriptFolder(""); //$NON-NLS-1$
			// else
			// currentScriptFolder = null;
			currentScriptFolder = getScriptFolder
			filenameStatus = filenameChanged
			typeNameStatus = typeNameChanged
			superClassStatus = superClassChanged
			superMixinsStatus = superMixinsChanged
		}
    doStatusUpdate
	}
  
  internal Void doStatusUpdate()
  {
    updateStatus([
      containerStatus,
      filenameStatus,
      typeNameStatus,
      modifierStatus,
      superClassStatus,
      superMixinsStatus])
  }

  override Void setVisible(Bool visible)
  {
    super.setVisible(visible)
    if (visible)
      setFocus
    else
    {
      dialogSettings := getDialogSettings
      if (dialogSettings != null) helper.storeSettings(dialogSettings)
    }
  } 

	Str getFilename() { filenameDialogField.getText }
//
//	public void setFilename(String filename, boolean canBeModified) {
//		fCanModifyFilename = canBeModified;
//		String str = (filename == null) ? "" : filename;
//		fFilenameDialogField.setText(str);
//		updateEnableState();
//	}
//
	Bool isFilenameExistingSelected() { filenameExistingSelection.isSelected }
//
//	public void setFilenameExistingSelection(boolean isSelected,
//			boolean canBeModified) {
//		fFilenameExistingSelection.setSelection(isSelected);
//		fFilenameExistingSelection.setEnabled(canBeModified);
//		updateEnableState();
//	}
//
	Str getTypeName() { typeNameDialogField.getText }
//
//	public void setTypeName(String name, boolean canBeModified) {
//		fTypeNameDialogField.setText(name);
//		fTypeNameDialogField.setEnabled(canBeModified);
//	}
//
	public Modifiers getModifiers() {
		mdf := 0
		if (accMdfButtons.isSelected(publicIdx)) mdf += FanModifiers.AccPublic
		if (accMdfButtons.isSelected(internalIdx)) mdf += FanModifiers.AccInternal
		if (otherMdfButtons.isSelected(abstractIdx)) mdf += FanModifiers.AccAbstract
		if (otherMdfButtons.isSelected(finalIdx)) mdf += FanModifiers.AccFinal
		if (otherMdfButtons.isSelected(constIdx)) mdf += FanModifiers.AccConst
		return Modifiers(mdf)
	}

	Void setModifiers(Modifiers modifiers, Bool canBeModified)
  {
		if (modifiers.isPublic)
			accMdfButtons.setSelection(publicIdx, true)
		else if (modifiers.isInternal)
			accMdfButtons.setSelection(internalIdx, true)
		else
			accMdfButtons.setSelection(defaultIdx, true)
		if (modifiers.isAbstract)
			otherMdfButtons.setSelection(abstractIdx, true)
		if (modifiers.isFinal)
			otherMdfButtons.setSelection(finalIdx, true)
		if (modifiers.isConst)
			otherMdfButtons.setSelection(constIdx, true)

		accMdfButtons.setEnabled(canBeModified)
		otherMdfButtons.setEnabled(canBeModified)
	}

	Str getSuperClass()
  {
		superclassQualified := superClassDialogField.getText
		pos := superClassDialogField.getText.indexr("::")
		return pos != null ? superclassQualified[pos+2..-1] : superclassQualified
	}

	Str getSuperClassQualified() { superClassDialogField.getText }

//	public void setSuperClass(String name, boolean canBeModified) {
//		fSuperClassDialogField.setText(name);
//		fSuperClassDialogField.setEnabled(canBeModified);
//	}

	Str[] getSuperMixins()
  {
		mixins := superMixinsDialogField.getElements
		result := Str[,]
		for(iter := mixins.iterator; iter.hasNext;)
			result.add(((MixinWrapper)iter.next).mixinName)
		return result
	}

	public Str[] getSuperMixinsQualified() {
		mixins := superMixinsDialogField.getElements
    result := Str[,]
		for (iter := mixins.iterator; iter.hasNext;)
			result.add(((MixinWrapper)iter.next).mixinQualifiedName)
		return result
	}

	Void setSuperMixins(Str[] mixinNames, Bool canBeModified)
  {
		mixins := ArrayList(mixinNames.size)
    mixinNames.each
    {
      mixins.add(MixinWrapper(it))
    }
		superMixinsDialogField.setElements(mixins)
		superMixinsDialogField.setEnabled(canBeModified)
	}

	Bool addSuperMixin(Str superMixin) { superMixinsDialogField.addElement(MixinWrapper(superMixin)) }

	Void setAddComments(Bool doAddComments, Bool canBeModified)
  {
		addCommentButton.setSelection(doAddComments)
		addCommentButton.setEnabled(canBeModified)
	}

	Void enableCommentControl(Bool useAddCommentValue)
  {
		useAddCommentButtonValue = useAddCommentValue
	}

	Bool isAddComments() { useAddCommentButtonValue && addCommentButton.isSelected }

	private Void updateEnableState()
  {
		existing := filenameExistingSelection.isSelected
		filenameDialogField.getTextControl.setEnabled(canModifyFilename)
		filenameDialogField.setText("")
		filenameDialogField.getTextControl.setEditable(!existing)
		filenameDialogField.enableButton(canModifyFilename && existing)
	}

	protected IStatus filenameChanged()
  {
		status := StatusInfo()

		if (getFilename.size == 0) {
			status.setError(FanWizardMessages.NewTypeWizardPage_fileNameCannotBeEmpty)
      return status
		}
		if (!Path.EMPTY.isValidSegment(getFilename))
			status.setError(FanWizardMessages.NewTypeWizardPage_invalidFileName)
		if (currentScriptFolder == null) return status
		module := currentScriptFolder.getSourceModule(getFilename)
		resource := module.getResource
		if (module.exists && !isFilenameExistingSelected)
    {
			status.setError(FanWizardMessages.NewTypeWizardPage_fileAlreadyExists)
      return status
		}
		if (resource != null && !isFilenameExistingSelected)
    {
			location := resource.getLocationURI
			if (location != null)
      {
				//try {
					if (EFS.getStore(location).fetchInfo.exists)
						status.setError(NewWizardMessages.NewTypeWizardPage_error_TypeNameExistsDifferentCase)
				//}
        //catch (CoreException e)
        //{
				//	status.setError(NewWizardMessages.NewTypeWizardPage_error_uri_location_unkown)
				//}
			}
		}
		return status
	}

	protected IStatus typeNameChanged()
  {
		status := StatusInfo()
		typeName := getTypeName
		// must not be empty
		if (typeName.size == 0)
    {
			status.setError(FanWizardMessages.NewTypeWizardPage_typeNameCannotBeEmpty)
			return status
		}

		if (!isFilenameExistingSelected)
      filenameDialogField.setText(typeNameDialogField.getText+".fan")

		project := getProjectFragment.getScriptProject
		val := validateFanTypeName(typeName, project)
    switch (val.getSeverity) {
    case IStatus.ERROR:
			status.setError(NLS.bind(
					FanWizardMessages.NewTypeWizardPage_error_InvalidTypeName,
					val.getMessage))
			return status
		case IStatus.WARNING:
			status.setWarning(NLS.bind(
					FanWizardMessages.NewTypeWizardPage_warning_TypeNameDiscouraged,
					val.getMessage))
		}

		// must not exist

//		final List<IModelElement> availableTypes = new ArrayList<IModelElement>();
//		TypeNameMatchRequestor requestor = new TypeNameMatchRequestor() {
//			@Override
//			public void acceptTypeNameMatch(TypeNameMatch match) {
//				SourceParserUtil.getModuleDeclaration(match.getType()
//						.getSourceModule());
//				IProjectFragment me = (IProjectFragment) match.getType()
//						.getAncestor(IModelElement.PROJECT_FRAGMENT);
//				if (match.getType().getElementName().equals(typeName)
//						&& !me.isArchive() && !me.isExternal())
//					availableTypes.add(match.getType());
//			}
//		};
		// ScriptModelUtil.searchTypeDeclarations(project, typeName, requestor);
		// if (!availableTypes.isEmpty()) {
		// status
		// .setError(FanWizardMessages.NewTypeWizardPage_error_TypeNameExists);
		// return status;
		// }
		return status
	}

	private IStatus validateFanTypeName(Str typeName, IScriptProject project)
  {
		StatusInfo()
	}

	protected IStatus superClassChanged()
  {
		status := StatusInfo()
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
		return status
	}
//
//	// private StubTypeContext getSuperClassStubTypeContext() {
//	// if (fSuperClassStubTypeContext == null) {
//	// String typeName;
//	// if (fCurrType != null) {
//	// typeName= getTypeName();
//	// } else {
//	// typeName= JavaTypeCompletionProcessor.DUMMY_CLASS_NAME;
//	// }
//	// fSuperClassStubTypeContext=
//	// TypeContextChecker.createSuperClassStubTypeContext(typeName,
//	// getEnclosingType(), getPackageFragment());
//	// }
//	// return fSuperClassStubTypeContext;
//	// }
//
	protected IStatus superMixinsChanged()
  {
		status := StatusInfo()

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
		return status
	}
//
//	// private StubTypeContext getSuperInterfacesStubTypeContext() {
//	// if (fSuperInterfaceStubTypeContext == null) {
//	// String typeName;
//	// if (fCurrType != null) {
//	// typeName= getTypeName();
//	// } else {
//	// typeName= JavaTypeCompletionProcessor.DUMMY_CLASS_NAME;
//	// }
//	// fSuperInterfaceStubTypeContext=
//	// TypeContextChecker.createSuperInterfaceStubTypeContext(typeName,
//	// getEnclosingType(), getPackageFragment());
//	// }
//	// return fSuperInterfaceStubTypeContext;
//	// }
//
	protected IStatus modifiersChanged()
  {
		status := StatusInfo()
		modifiers := getModifiers
		if (modifiers.isFinal && modifiers.isAbstract)
			status.setError(FanWizardMessages.NewTypeWizardPage_error_ModifiersFinalAndAbstract)
		return status
	}

	protected ISourceModule? chooseFilename()
  {
		provider := ScriptExplorerContentProvider(false)
		labelProvider := ScriptExplorerLabelProvider(
      provider, FanUI.instance.plugin.getPreferenceStore)
		dialog := ElementTreeSelectionDialog(getShell, labelProvider, provider)
		dialog.setTitle(DLTKLaunchConfigurationsMessages.mainTab_searchButton_title)
		dialog.setMessage(DLTKLaunchConfigurationsMessages.mainTab_searchButton_message)
		proj := getProjectFragment.getScriptProject
		if (proj == null) return null
		dialog.addFilter(FanScriptFileFilter("fan"))
		dialog.setInput(proj)
		dialog.setComparator(ResourceComparator(ResourceComparator.NAME))
		dialog.setAllowMultiple(false)
		return dialog.open == IDialogConstants.OK_ID ? dialog.getFirstResult : null
	}

	protected IType? chooseSuperClass()
  {
		project := getProjectFragment.getScriptProject
		if (project == null) return null

		scope := SearchEngine.createSearchScope(project)
		dialog := FilteredTypesSelectionDialog(
				getShell, false, PlatformUI.getWorkbench.getProgressService, scope,
				IDLTKSearchConstants.TYPE, FanTypeSelectionExtension(),
				FanLanguageToolkit.getDefault)
		dialog.setMessage(FanWizardMessages.NewTypeWizardPage_superClassDialog_message)
		dialog.setInitialPattern(getSuperClass)
    dialog.setTitle(FanWizardMessages.NewTypeWizardPage_superClassDialog_title)
		if (dialog.open == IDialogConstants.OK_ID)
    {
			types := dialog.getResult
			if (types != null && types.size > 0)
				return types[0]
		}
		return null
	}

	protected Void chooseSuperMixins()
  {
		project := getProjectFragment.getScriptProject
		if (project == null) return
		dialog := SuperMixinSelectionDialog(getShell, getWizard.getContainer, this, project)
		dialog.setTitle(getMixinDialogTitle)
		dialog.setMessage(FanWizardMessages.NewTypeWizardPage_mixinsDialog_message)
		dialog.open
	}

	private Str getMixinDialogTitle()
  {
		typeKind == TypeKind.mixinType ?
			FanWizardMessages.NewTypeWizardPage_mixinsDialog_mixin_title :
		  FanWizardMessages.NewTypeWizardPage_mixinsDialog_class_title
	}

	Void createType(IProgressMonitor? monitor)
  {
		if (monitor == null) monitor = NullProgressMonitor()

		monitor.beginTask(FanWizardMessages.NewTypeWizardPage_operationdesc, 3)

		if (!isFilenameExistingSelected)
    {
			currentSourceModule = createFile(monitor);
			lineDelimiter = CodeGeneration.getLineDelimiterUsed(currentSourceModule)
		}
    else 
    {
			workingCopy := currentSourceModule.isWorkingCopy
        ? currentSourceModule
        : currentSourceModule.getWorkingCopy(NullProgressMonitor())
			buffer := workingCopy.getBuffer
			if (buffer != null) {
				if (!buffer.getContents.endsWith(lineDelimiter)) buffer.append(lineDelimiter)
				buffer.append(lineDelimiter)
				if (isAddComments) buffer.append(getTypeComment(currentSourceModule))
				buffer.append(getTypeContent)
			}

			usingsManager := UsingsManager(workingCopy)
			usingsManager.addUsing(getSuperClassQualified, false)
			usingsManager.addUsings(getSuperMixinsQualified, false)
      // VK : appendUsings didn't work in Java version either
			//usingsManager.appendUsings

			workingCopy.commitWorkingCopy(false, NullProgressMonitor())
		}
		monitor.worked(2)
		createdType = SourceType(currentSourceModule.getPrimaryElement, getTypeName)
		monitor.done
	}

	override protected const Str? getRequiredNature := F4Nature.id

	ISourceModule createFile(IProgressMonitor monitor)
  {
		fileName := getFileNameWithExtension
		module := currentScriptFolder.getSourceModule(fileName)
		currentScriptFolder.createSourceModule(fileName, getFileContent(module), true, monitor)
		return module
	}

	protected Str getFileContent(ISourceModule module)
  {
		usingManager := UsingsManager(module)
		usingManager.addUsing(getSuperClassQualified, false)
		usingManager.addUsings(getSuperMixinsQualified, false)

		comment := isAddComments ? getFileComment(module) : ""
		typeComment := isAddComments ? getTypeComment(module) : ""
		return comment + usingManager.getUsings + lineDelimiter + typeComment + getTypeContent
	}

	protected Str getFileNameWithExtension()
  {
		fileText := getFilename
		exts := getFileExtensions
    found := exts.eachWhile { size > 0 && fileText.endsWith("." + it) ? fileText : null }
		return found ?: fileText + "." + exts[0]
	}

	protected Str[] getFileExtensions()
  {
		requiredNature := getRequiredNature
		toolkit := DLTKLanguageManager.getLanguageToolkit(requiredNature)
		return ScriptModelUtil.getFileExtensions(toolkit) ?: [""]
	}

	protected Str getTypeContent() { constructTypeStub(lineDelimiter) }

	private Str writeSuperClass()
  {
		superclass := getSuperClass
		if (typeKind == TypeKind.classType && superclass.size > 0 && getSuperClassQualified != "sys::Obj")
			return " : " + superclass
		return ""
	}

	private Str writeSuperInterfaces(Bool superClassAdded)
  {
		mixins := getSuperMixins
    return mixins.isEmpty ? "" : (superClassAdded ? ", " : " : ") + mixins.join(", ") { it[indexr("::")+2..-1] }
	}
//
//	@SuppressWarnings("unused")
//	private String constructSimpleTypeStub(String lineDelimiter) {
//		StringBuffer buf = new StringBuffer("public class ");
//		buf.append(getTypeName());
//		buf.append("\n{\n\n}\n");
//		return buf.toString();
//	}
//
	private Str constructTypeStub(Str lineDelimiter)
  {
		buf := StrBuf()

    modifiers := getModifiers
		buf.add(modifiers)
    if (modifiers.flags != 0) buf.add(' ')
		buf.add(typeKind.code).add(getTypeName)
		superclass := writeSuperClass
		buf.add(superclass).add(writeSuperInterfaces(superclass.size > 0)).add(lineDelimiter)
    buf.add("{").add(lineDelimiter)
		buf.add(getTypeBody(getTypeName, lineDelimiter))
		buf.add("}").add(lineDelimiter)
		return buf.toStr
	}

	protected Str getTypeBody(Str typeName, Str lineDelimiter) { helper.getTypeBody(typeName, lineDelimiter) }

	protected Str getFileComment(ISourceModule module) { getComment(module, FanCodeTemplateAccess.filesContextId) }

	protected Str getTypeComment(ISourceModule module) { getComment(module, FanCodeTemplateAccess.typesContextId) }
  
  private Str getComment(ISourceModule module,Str contextId)
  {
    templateAccess := FanCodeTemplateArea().getTemplateAccess
    templates := templateAccess.getTemplateStore.getTemplates(contextId)
    if (templates.size == 0) return ""
    Template? template := templates[0]
    if (template == null) return ""
    contextType := templateAccess.getContextTypeRegistry.getContextType(template.getContextTypeId)
    // TODO introduce a way to create context by contextType
    context := SourceModuleTemplateContext(contextType, CodeGeneration.getLineDelimiterUsed(module))
    context.setSourceModuleVariables(module)
    return CodeGeneration.evaluateTemplate(context, template, Str[,]) ?: ""
  }
//
//	protected String getFileContent() {
//		return Util.EMPTY_STRING;
//	}

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

const class Modifiers : Flags
{
  override const Int flags
  new make(Int flags)
  {
    this.flags = flags
  }
}

enum class TypeKind {
  classType("class"),
  mixinType("mixin"),
  enumType("enum class")

  const Str code
  
  private new make(Str code)
  {
    this.code = code
  }
}

internal class FanTypeFieldsAdapter : IStringButtonAdapter,
      IDialogFieldListener, IListAdapter, SelectionListener {
  private FanNewTypePage page
  new make(FanNewTypePage page)
  {
    this.page = page
  }
  override Void changeControlPressed(DialogField? field)
  {
    page.typePageChangeControlPressed(field)
  }

  override Void dialogFieldChanged(DialogField? field)
  {
    page.typePageDialogFieldChanged(field)
  }

  override Void customButtonPressed(ListDialogField? field, Int index)
  {
    page.typePageCustomButtonPressed(field, index)
  }

  override Void doubleClicked(ListDialogField? field) { }

  override Void selectionChanged(ListDialogField? field) { }

  override Void widgetDefaultSelected(SelectionEvent? e)
  {
    page.typePageLinkActivated
  }

  override Void widgetSelected(SelectionEvent? e) {
    page.typePageLinkActivated
  }
}

internal class MixinsListLabelProvider : LabelProvider
{
  private Image mixinImage := DLTKPluginImages.get(DLTKPluginImages.IMG_OBJS_INTERFACE)

  override Str? getText(Obj? element)
  {
    BasicElementLabels.getJavaElementName(((MixinWrapper) element).mixinQualifiedName)
  }

  override Image? getImage(Obj? element) { mixinImage }
}

internal const class MixinWrapper
{
  const Str mixinName
  const Str mixinQualifiedName

  new make(Str mixinQualifiedName)
  {
    this.mixinQualifiedName = mixinQualifiedName
    pos := mixinQualifiedName.indexr("::")
    if (pos != null)
      this.mixinName = mixinQualifiedName[mixinQualifiedName.indexr("::") + 2..-1]
    else
      this.mixinName = mixinQualifiedName
  }

  override Int hash() { mixinQualifiedName.hash + 12345 }

  override Bool equals(Obj? obj)
  {
    mixinQualifiedName == (obj as MixinWrapper)?.mixinQualifiedName
  }
}
/**
 * Class used in stub creation routines to add needed imports to a source
 * module.
 */
public class UsingsManager {
  private FanUsing[] usings
  //private FanUsing[] moduleUsings
  private ISourceModule module
  private Str lineDelimiter
  //private UsingStmt[] usingStatements

  new make(ISourceModule module)
  {
    this.module = module
    //try {
      lineDelimiter = CodeGeneration.getLineDelimiterUsed(module)
      if (lineDelimiter.size == 0) lineDelimiter = "\n"
    //} catch (ModelException e) {
    //  lineDelimiter = "\n";
    //}
    usings = FanUsing[,]
    //moduleUsings = FanUsing[,]
    // VK: this stuff didn't work already. Needs AST rewrite for proper solution
    // parse without caching because we are going to change it anyway
    //moduleDecl := SourceParserUtil.getModuleDeclaration(module)
    //if (moduleDecl != null)
    //  usingStatements = FanASTUtils.getUsingPackages(moduleDecl)
    //else
    //  usingStatements = UsingStmt[,]
    //usingStatements.each
    //  moduleUsings.add(FanUsing(it))
  }

  Void addUsing(Str qualifiedName, Bool allPod)
  {
    use := FanUsing(qualifiedName)
    if (use.getTypeName == null && !allPod) return
    // TODO treeSet for usings would be better
    if (!usings.contains(use)) usings.add(use)
  }
  
  Void addUsings(Str[] qualifiedNames, Bool allPod)
  {
    qualifiedNames.each { addUsing(it, allPod) }
  }

  Str getUsings() { usings.join("") { it.toStr + lineDelimiter } }

//  public void removeUsing(String qualifiedName) {
//    usings.remove(new FanUsing(qualifiedName));
//  }
//
//  public void removeUsings(List<String> qualifiedNames) {
//    for (String name : qualifiedNames) {
//      usings.remove(new FanUsing(name));
//    }
//  }
//
//  public boolean rewriteUsings() {
//    try {
//      IBuffer buffer = module.getBuffer();
//      if (buffer != null && !buffer.isClosed()
//          && !buffer.isReadOnly()) {
//        int usingsBeginPosition = buffer.getLength();
//        int usingsEndPosition = 0;
//        for (UsingStmt stmt : usingStatements) {
//          usingsBeginPosition = Math.min(stmt.sourceStart(),
//              usingsBeginPosition);
//          usingsEndPosition = Math.max(stmt.sourceEnd(),
//              usingsEndPosition);
//        }
//
//        String text = "";
//        TreeSet<FanUsing> allusings = new TreeSet<FanUsing>();
//        allusings.addAll(usings);
//        allusings.addAll(moduleUsings);
//        for (FanUsing using : allusings) {
//          text += using + lineDelimiter;
//        }
//        if (usingsEndPosition - usingsBeginPosition > 0) {
//          buffer.replace(usingsBeginPosition, usingsEndPosition
//              - usingsBeginPosition, text);
//          return true;
//        }
//      } else {
//        return false;
//      }
//    } catch (ModelException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
//    return false;
//  }
//
//  Bool appendUsings()
//  {
//    buffer := module.getBuffer
//    if (buffer == null || buffer.isClosed || buffer.isReadOnly) return false
//    usingsEndPosition := 0
//    for (UsingStmt stmt : usingStatements)
//      usingsEndPosition = stmt.sourceEnd.max(usingsEndPosition)
//
//    text := ""
//    for (FanUsing use : usings)
//      text += lineDelimiter + use
//    if (usingsEndPosition > 0) {
//      buffer.replace(usingsEndPosition, 0, text);
//      return true
//    }
//    return false
//  }
//
}
