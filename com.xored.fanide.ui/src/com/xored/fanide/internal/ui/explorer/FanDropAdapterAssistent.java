/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.internal.corext.refactoring.reorg.ReorgMoveStarter;
import org.eclipse.dltk.internal.corext.refactoring.reorg.ReorgPolicyFactory;
import org.eclipse.dltk.internal.corext.refactoring.reorg.ReorgUtils;
import org.eclipse.dltk.internal.corext.refactoring.reorg.IReorgPolicy.ICopyPolicy;
import org.eclipse.dltk.internal.corext.refactoring.reorg.IReorgPolicy.IMovePolicy;
import org.eclipse.dltk.internal.ui.refactoring.reorg.ScriptCopyProcessor;
import org.eclipse.dltk.internal.ui.refactoring.reorg.ScriptMoveProcessor;
import org.eclipse.jface.util.LocalSelectionTransfer;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.dnd.DND;
import org.eclipse.swt.dnd.DropTargetEvent;
import org.eclipse.swt.dnd.FileTransfer;
import org.eclipse.swt.dnd.TransferData;
import org.eclipse.ui.actions.CopyFilesAndFoldersOperation;
import org.eclipse.ui.navigator.CommonDropAdapter;
import org.eclipse.ui.navigator.CommonDropAdapterAssistant;

/**
 * @author kappa
 * 
 */
@SuppressWarnings("restriction")
public class FanDropAdapterAssistent extends CommonDropAdapterAssistant {
	private List fElements;
	private ScriptMoveProcessor fMoveProcessor;
	private int fCanMoveElements;
	private ScriptCopyProcessor fCopyProcessor;
	private int fCanCopyElements;

	@Override
	public IStatus handleDrop(CommonDropAdapter dropAdapter,
			DropTargetEvent dropTargetEvent, Object target) {
		if (LocalSelectionTransfer.getTransfer().isSupportedType(
				dropAdapter.getCurrentTransfer())) {
			try {
				target = getActualTarget(target);
				switch (dropAdapter.getCurrentOperation()) {
				case DND.DROP_MOVE:
					handleDropMove(target);
					dropTargetEvent.detail = DND.DROP_NONE;
					break;
				case DND.DROP_COPY:
					handleDropCopy(target);
					break;
				}
			} catch (ModelException e) {
			} catch (InvocationTargetException e) {
			} catch (InterruptedException e) {
				// ok
			}
			clear();
			return Status.OK_STATUS;
		} else if (FileTransfer.getInstance().isSupportedType(
				dropAdapter.getCurrentTransfer())) {
			try {
				final IContainer targetContainer = getTargetContainer(target);
				if (targetContainer == null)
					return Status.CANCEL_STATUS;

				getShell().forceActive();
				final Object data = FileTransfer.getInstance().nativeToJava(
						dropAdapter.getCurrentTransfer());
				new CopyFilesAndFoldersOperation(getShell()).copyFiles(
						(String[]) data, targetContainer);
			} catch (ModelException e) {
			}
			return Status.OK_STATUS;
		}
		return Status.CANCEL_STATUS;
	}

	@Override
	public IStatus validateDrop(Object target, int operation,
			TransferData transferType) {
		IStatus result = Status.OK_STATUS;
		if (LocalSelectionTransfer.getTransfer().isSupportedType(transferType)) {
			target = getActualTarget(target);
			initializeSelection();
			try {
				switch (operation) {
				case DND.DROP_DEFAULT:
					if (handleValidateDefault(target) != DND.DROP_NONE) {
						result = Status.OK_STATUS;
					} else {
						result = Status.CANCEL_STATUS;
					}
					break;
				case DND.DROP_COPY:
					if (handleValidateCopy(target) != DND.DROP_NONE) {
						result = Status.OK_STATUS;
					} else {
						result = Status.CANCEL_STATUS;
					}
					break;
				case DND.DROP_MOVE:
					if (handleValidateMove(target) != DND.DROP_NONE) {
						result = Status.OK_STATUS;
					} else {
						if (handleValidateCopy(target) != DND.DROP_NONE) {
							// getCommonDropAdapter().overrideOperation(
							// DND.DROP_COPY); // commented to suport 3.4
							result = Status.OK_STATUS;
						} else {
							result = Status.CANCEL_STATUS;
						}
					}
					break;
				}
			} catch (ModelException e) {
				result = Status.CANCEL_STATUS;
			}
		} else if (FileTransfer.getInstance().isSupportedType(transferType)) {
			try {

				final Object data = FileTransfer.getInstance().nativeToJava(
						transferType);
				if (!(data instanceof String[]))
					return Status.CANCEL_STATUS;

				final IContainer targetContainer = getTargetContainer(target);
				if (targetContainer == null || !targetContainer.isAccessible())
					return Status.CANCEL_STATUS;
			} catch (ModelException e) {
				result = Status.CANCEL_STATUS;
			}
		}
		return result;
	}

	@Override
	public boolean isSupportedType(TransferData transferType) {
		return super.isSupportedType(transferType)
				|| FileTransfer.getInstance().isSupportedType(transferType);
	}

	private Object getActualTarget(Object target) {
		if (target instanceof IProject) {
			IScriptProject jp = DLTKCore.create((IProject) target);
			if (jp.exists())
				return jp;
		}
		return target;
	}

	private IContainer getTargetContainer(Object dropTarget)
			throws ModelException {
		if (dropTarget instanceof IContainer)
			return (IContainer) dropTarget;
		else if (dropTarget instanceof IModelElement)
			return getTargetContainer(((IModelElement) dropTarget)
					.getCorrespondingResource());
		return null;
	}

	protected void initializeSelection() {
		if (fElements != null)
			return;
		ISelection s = LocalSelectionTransfer.getTransfer().getSelection();
		if (!(s instanceof IStructuredSelection)) {
			fElements = Collections.EMPTY_LIST;
			return;
		}
		fElements = ((IStructuredSelection) s).toList();
	}

	@SuppressWarnings("restriction")
	private void handleDropMove(final Object target) throws ModelException,
			InvocationTargetException, InterruptedException {
		IModelElement[] javaElements = ReorgUtils.getModelElements((fElements));
		IResource[] resources = ReorgUtils.getResources(fElements);
		ReorgMoveStarter starter = null;
		if (target instanceof IResource)
			starter = ReorgMoveStarter.create(javaElements, resources,
					(IResource) target);
		else if (target instanceof IModelElement)
			starter = ReorgMoveStarter.create(javaElements, resources,
					(IModelElement) target);
		if (starter != null)
			starter.run(getShell());
	}

	private void handleDropCopy(final Object target) throws ModelException,
			InvocationTargetException, InterruptedException {
		IModelElement[] javaElements = ReorgUtils.getModelElements(fElements);
		IResource[] resources = ReorgUtils.getResources(fElements);
		ReorgMoveStarter starter = null;
		if (target instanceof IResource)
			starter = ReorgMoveStarter.create(javaElements, resources,
					(IResource) target);
		else if (target instanceof IModelElement)
			starter = ReorgMoveStarter.create(javaElements, resources,
					(IModelElement) target);
		if (starter != null)
			starter.run(getShell());
	}

	private int handleValidateCopy(Object target) throws ModelException {

		final ICopyPolicy policy = ReorgPolicyFactory.createCopyPolicy(
				ReorgUtils.getResources(fElements), ReorgUtils
						.getModelElements(fElements));
		fCopyProcessor = policy.canEnable() ? new ScriptCopyProcessor(policy)
				: null;

		if (!canCopyElements())
			return DND.DROP_NONE;

		if (fCopyProcessor == null)
			return DND.DROP_NONE;

		if (target instanceof IResource && fCopyProcessor != null
				&& fCopyProcessor.setDestination((IResource) target).isOK())
			return DND.DROP_COPY;
		else if (target instanceof IModelElement && fCopyProcessor != null
				&& fCopyProcessor.setDestination((IModelElement) target).isOK())
			return DND.DROP_COPY;
		else
			return DND.DROP_NONE;

	}

	private int handleValidateDefault(Object target) throws ModelException {
		if (target == null)
			return DND.DROP_NONE;

		return handleValidateMove(target);
	}

	private int handleValidateMove(Object target) throws ModelException {
		if (target == null)
			return DND.DROP_NONE;

		IMovePolicy policy = ReorgPolicyFactory.createMovePolicy(ReorgUtils
				.getResources(fElements), ReorgUtils
				.getModelElements(fElements));
		fMoveProcessor = (policy.canEnable()) ? new ScriptMoveProcessor(policy)
				: null;

		if (!canMoveElements())
			return DND.DROP_NONE;

		if (fMoveProcessor == null)
			return DND.DROP_NONE;

		if (target instanceof IResource && fMoveProcessor != null
				&& fMoveProcessor.setDestination((IResource) target).isOK())
			return DND.DROP_MOVE;
		else if (target instanceof IModelElement && fMoveProcessor != null
				&& fMoveProcessor.setDestination((IModelElement) target).isOK())
			return DND.DROP_MOVE;
		else
			return DND.DROP_NONE;
	}

	private boolean canMoveElements() {
		if (fCanMoveElements == 0) {
			fCanMoveElements = 2;
			if (fMoveProcessor == null)
				fCanMoveElements = 1;
		}
		return fCanMoveElements == 2;
	}

	private boolean canCopyElements() {
		if (fCanCopyElements == 0) {
			fCanCopyElements = 2;
			if (fCopyProcessor == null)
				fCanCopyElements = 1;
		}
		return fCanCopyElements == 2;
	}

	private void clear() {
		fElements = null;
		fMoveProcessor = null;
		fCanMoveElements = 0;
		fCopyProcessor = null;
		fCanCopyElements = 0;
	}

}
