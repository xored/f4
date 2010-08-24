package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

import com.xored.fanide.ast.references.SlotReference;
import com.xored.fanide.ast.typesystem.FanTypeRef;

public class SlotLiteral extends Literal implements FanExpressionConstants {
	private SlotReference slot;
	private FanTypeRef type;

	public SlotLiteral(int start, int end) {
		super(start, end);
	}

	@Override
	public int getKind() {
		return SLOT_LITERAL;
	}

	public SlotReference getSlot() {
		return slot;
	}

	public void setSlot(SlotReference slot) {
		this.slot = slot;
	}

	public FanTypeRef getType() {
		return type;
	}

	public void setType(FanTypeRef type) {
		this.type = type;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (slot != null) {
				slot.traverse(visitor);
			}
			if (type != null) {
				type.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}
}
