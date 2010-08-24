/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.wizards;

import org.eclipse.osgi.util.NLS;

public class FanWizardMessages extends NLS {

	private static final String BUNDLE_NAME = "com.xored.fanide.internal.ui.wizards.FanWizardMessages";//$NON-NLS-1$

	private FanWizardMessages() {
	}

	public static String ProjectCreationWizard_title;
	
	public static String ProjectCreationWizardFirstPage_title;
	public static String ProjectCreationWizardFirstPage_description;
	
	public static String NewTypeWizardPage_filename_existing_selection_label;
	public static String NewTypeWizardPage_filename_label;
	public static String NewTypeWizardPage_filename_field_description;
	public static String NewTypeWizardPage_filename_button;
	public static String NewTypeWizardPage_typename_label;
	public static String NewTypeWizardPage_superclass_label;
	public static String NewTypeWizardPage_superclass_button;
	public static String NewTypeWizardPage_mixins_class_label;
	public static String NewTypeWizardPage_mixins_ifc_label;
	public static String NewTypeWizardPage_mixins_add;
	public static String NewTypeWizardPage_mixins_remove;
	public static String NewTypeWizardPage_modifiers_acc_label;
	public static String NewTypeWizardPage_labelModifiersPublic;
	public static String NewTypeWizardPage_labelModifiersInternal;
	public static String NewTypeWizardPage_labelModifiersDefault;
	public static String NewTypeWizardPage_labelModifiersAbstract;
	public static String NewTypeWizardPage_labelModifiersFinal;
	public static String NewTypeWizardPage_labelModifiersConst;
	public static String NewTypeWizardPage_addcomment_label;
	public static String NewTypeWizardPage_addcomment_description;
	public static String NewTypeWizardPage_configure_templates_message;
	public static String NewTypeWizardPage_configure_templates_title;
	public static String NewTypeWizardPage_fileNameCannotBeEmpty;
	public static String NewTypeWizardPage_invalidFileName;
	public static String NewTypeWizardPage_typeNameCannotBeEmpty;
	public static String NewTypeWizardPage_error_QualifiedName;
	public static String NewTypeWizardPage_error_ModifiersFinalAndAbstract;
	public static String NewTypeWizardPage_error_ModifiersFinalAndConst;
	public static String NewTypeWizardPage_error_ModifiersConstAndAbstract;
	public static String NewTypeWizardPage_mixinsDialog_message;
	public static String NewTypeWizardPage_mixinsDialog_class_title;
	public static String NewTypeWizardPage_mixinsDialog_mixin_title;
	public static String NewTypeWizardPage_operationdesc;
	public static String NewTypeWizardPage_fileAlreadyExists;
	public static String NewTypeWizardPage_superClassDialog_message;
	public static String NewTypeWizardPage_superClassDialog_title;
	public static String NewTypeWizardPage_error_InvalidTypeName;
	public static String NewTypeWizardPage_warning_TypeNameDiscouraged;
	public static String NewTypeWizardPage_error_TypeNameExists;

	public static String NewClassWizard_title;
	public static String NewClassPage_title;
	public static String NewClassPage_description;
	public static String NewClassPage_classNameCannotBeEmpty;
	public static String NewClassPage_labelName;
	public static String NewClassPage_methods_label;
	public static String NewClassPage_methods_main;
	public static String NewClassPage_methods_constructors;
	public static String NewClassPage_methods_inherited;

	public static String NewMixinWizard_title;
	public static String NewMixinPage_title;
	public static String NewMixinPage_description;
	public static String NewMixinPage_mixinNameCannotBeEmpty;
	public static String NewMixinPage_labelName;
	public static String NewMixinPage_labelModifiers;
	public static String NewMixinPage_labelModifiersPublic;
	public static String NewMixinPage_labelModifiersInternal;
	public static String NewMixinPage_labelModifiersDefault;
	public static String NewMixinPage_labelModifiersConst;

	public static String NewEnumWizard_title;
	public static String NewEnumPage_title;
	public static String NewEnumPage_description;
	public static String NewEnumPage_enumNameCannotBeEmpty;
	public static String NewEnumPage_labelName;
	public static String NewEnumPage_labelModifiers;
	public static String NewEnumPage_labelModifiersPublic;
	public static String NewEnumPage_labelModifiersInternal;
	public static String NewEnumPage_labelModifiersDefault;

	public static String NewScriptWizard_title;
	public static String NewScriptPage_title;
	public static String NewScriptPage_description;

	public static String NewPackageWizard_title;
	public static String NewPackagePage_title;
	public static String NewPackagePage_description;
	
	public static String SuperMixinSelectionDialog_addButton_label;
	public static String SuperMixinSelectionDialog_mixinadded_info;
	public static String SuperMixinSelectionDialog_mixinalreadyadded_info;

	static {
		NLS.initializeMessages(BUNDLE_NAME, FanWizardMessages.class);
	}
}