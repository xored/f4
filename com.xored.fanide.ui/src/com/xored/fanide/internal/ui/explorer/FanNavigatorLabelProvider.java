/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IResource;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.internal.ui.navigator.ScriptExplorerContentProvider;
import org.eclipse.dltk.internal.ui.navigator.ScriptExplorerLabelProvider;
import org.eclipse.dltk.internal.ui.navigator.IExtensionStateConstants.Values;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.ScriptElementLabels;
import org.eclipse.dltk.ui.viewsupport.BasicElementLabels;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.jface.viewers.ILabelDecorator;
import org.eclipse.jface.viewers.ILabelProviderListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.ui.IMemento;
import org.eclipse.ui.navigator.ICommonContentExtensionSite;
import org.eclipse.ui.navigator.ICommonLabelProvider;
import org.eclipse.ui.navigator.IExtensionStateModel;

@SuppressWarnings("restriction")
public class FanNavigatorLabelProvider implements ICommonLabelProvider {

	private final long LABEL_FLAGS = ScriptElementLabels.DEFAULT_QUALIFIED
			| ScriptElementLabels.ROOT_POST_QUALIFIED
			| ScriptElementLabels.APPEND_ROOT_PATH
			| ScriptElementLabels.M_PARAMETER_TYPES
			| ScriptElementLabels.M_PARAMETER_NAMES
			| ScriptElementLabels.M_APP_RETURNTYPE
			| ScriptElementLabels.M_EXCEPTIONS
			| ScriptElementLabels.F_APP_TYPE_SIGNATURE
			| ScriptElementLabels.T_TYPE_PARAMETERS;

	private ScriptExplorerLabelProvider delegeteLabelProvider;

	private ScriptExplorerContentProvider fContentProvider;

	private IExtensionStateModel fStateModel;

	private IPropertyChangeListener fLayoutPropertyListener;

	public FanNavigatorLabelProvider() {

	}

	public void init(ICommonContentExtensionSite commonContentExtensionSite) {
		fStateModel = commonContentExtensionSite.getExtensionStateModel();
		fContentProvider = (ScriptExplorerContentProvider) commonContentExtensionSite
				.getExtension().getContentProvider();
		delegeteLabelProvider = createLabelProvider();

		delegeteLabelProvider.setIsFlatLayout(fStateModel
				.getBooleanProperty(Values.IS_LAYOUT_FLAT));
		fLayoutPropertyListener = new IPropertyChangeListener() {
			public void propertyChange(PropertyChangeEvent event) {
				if (Values.IS_LAYOUT_FLAT.equals(event.getProperty())) {
					if (event.getNewValue() != null) {
						boolean newValue = ((Boolean) event.getNewValue())
								.booleanValue() ? true : false;
						delegeteLabelProvider.setIsFlatLayout(newValue);
					}
				}

			}
		};
		fStateModel.addPropertyChangeListener(fLayoutPropertyListener);
	}

	public String getDescription(Object element) {
		return formatMessage(element);
	}

	private ScriptExplorerLabelProvider createLabelProvider() {
		return new ScriptExplorerLabelProvider(fContentProvider, DLTKUIPlugin
				.getDefault().getPreferenceStore());
	}

	public void dispose() {
		delegeteLabelProvider.dispose();
		fStateModel.removePropertyChangeListener(fLayoutPropertyListener);
	}

	public void propertyChange(PropertyChangeEvent event) {
		delegeteLabelProvider.propertyChange(event);
	}

	public void addLabelDecorator(ILabelDecorator decorator) {
		delegeteLabelProvider.addLabelDecorator(decorator);
	}

	public void addListener(ILabelProviderListener listener) {
		delegeteLabelProvider.addListener(listener);
	}

	public Color getBackground(Object element) {
		return delegeteLabelProvider.getBackground(element);
	}

	public Color getForeground(Object element) {
		return delegeteLabelProvider.getForeground(element);
	}

	public Image getImage(Object element) {
		return delegeteLabelProvider.getImage(element);
	}

	public boolean isLabelProperty(Object element, String property) {
		return delegeteLabelProvider.isLabelProperty(element, property);
	}

	public void removeListener(ILabelProviderListener listener) {
		delegeteLabelProvider.removeListener(listener);
	}

	@Override
	public boolean equals(Object obj) {
		return delegeteLabelProvider.equals(obj);
	}

	@Override
	public int hashCode() {
		return delegeteLabelProvider.hashCode();
	}

	@Override
	public String toString() {
		return delegeteLabelProvider.toString();
	}

	public String getText(Object element) {
		return delegeteLabelProvider.getText(element);
	}

	// public StyledString getStyledText(Object element) {
	// return delegeteLabelProvider.getStyledText(element);
	// }

	public void setIsFlatLayout(boolean state) {
		delegeteLabelProvider.setIsFlatLayout(state);
	}

	// Taken from StatusBarUpdater

	private String formatMessage(Object element) {
		if (element instanceof IModelElement) {
			return formatScriptElementMessage((IModelElement) element);
		} else if (element instanceof IResource) {
			return formatResourceMessage((IResource) element);
		}
		return ""; //$NON-NLS-1$
	}

	private String formatScriptElementMessage(IModelElement element) {
		return ScriptElementLabels.getDefault().getElementLabel(element,
				LABEL_FLAGS);
	}

	private String formatResourceMessage(IResource element) {
		IContainer parent = element.getParent();
		if (parent != null && parent.getType() != IResource.ROOT)
			return BasicElementLabels.getResourceName(element.getName())
					+ ScriptElementLabels.CONCAT_STRING
					+ BasicElementLabels.getPathLabel(parent.getFullPath(),
							false);
		else
			return BasicElementLabels.getResourceName(element.getName());
	}

	public void restoreState(IMemento memento) {

	}

	public void saveState(IMemento memento) {

	}

}
