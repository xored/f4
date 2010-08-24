package com.xored.fanide.ast.typesystem;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.references.Reference;
import org.eclipse.dltk.ast.references.SimpleReference;

public class FuncTypeRef extends FanTypeRef {
	protected FanTypeRef returnedType;
	protected List<Param> params = new ArrayList<Param>();

	public FanTypeRef getReturnedType() {
		return returnedType;
	}

	public void setReturnedType(FanTypeRef returnedType) {
		this.returnedType = returnedType;
	}

	public List<Param> getParams() {
		return Collections.unmodifiableList(params);
	}

	public void addParam(Param param) {
		Assert.isLegal(param != null);
		this.params.add(param);
	}

	public void setParams(List<Param> params) {
		this.params = params;
	}

	@Override
	public String getStringRepresentation() {
		String res = "|";
		if (params.isEmpty()) {
			if (returnedType == null) {
				res += ",";
			} else {
				res += "->" + returnedType.getStringRepresentation();
			}
		} else {
			boolean first = true;
			for (Param p : params) {
				if (first) {
					first = false;
				} else {
					res += ",";
				}
				res += p.getStringRepresentation();
			}
			if (returnedType != null) {
				res += "->" + returnedType.getStringRepresentation();
			}
		}
		res += "|";
		return res;
	}

	public static class Param extends Reference {

		protected FanTypeRef type;
		protected SimpleReference paramName;

		public FanTypeRef getType() {
			return type;
		}

		public void setType(FanTypeRef type) {
			this.type = type;
		}

		public SimpleReference getParamName() {
			return paramName;
		}

		public void setParamName(SimpleReference paramName) {
			this.paramName = paramName;
		}

		@Override
		public String getStringRepresentation() {
			String res = (type != null) ? type.getStringRepresentation() + " "
					: "";
			res = paramName.getStringRepresentation();
			return res;
		}
	}

	@Override
	public void setNullable(boolean b) {
	}
}
