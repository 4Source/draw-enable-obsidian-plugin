import { ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_NAV, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT, ICON_HELP } from 'src/constants';

export class Tool {
	private type: EToolType;
	private icon: string;

	constructor(type: EToolType) {
		this.setType(type);
	}

	setType(type: EToolType) {
		this.type = type;
		this.setDefaultIcon(type);
	}
	setStringType(type: string) {
		this.setType(Tool.StringToType(type));
	}
	getType() {
		return this.type;
	}

	setDefaultIcon(type: EToolType) {
		if(type == EToolType.pencil) {
			this.icon = ICON_EDIT_MODE_PENCIL;
		}
		else if(type == EToolType.marker) {
			this.icon = ICON_EDIT_MODE_MARKER;
		}
		else if(type == EToolType.eraser) {
			this.icon = ICON_EDIT_MODE_ERASER;
		}
		else if(type == EToolType.pointer) {
			this.icon = ICON_EDIT_MODE_POINTER;
		}
		else if(type == EToolType.navigate) {
			this.icon = ICON_EDIT_MODE_NAV;
		}
		else if(type == EToolType.select) {
			this.icon = ICON_EDIT_MODE_SELECT;
		}
		else {
			this.icon = ICON_HELP;
		}
	}
	getIcon() {
		return this.icon;
	}

	static StringToType(type: string): EToolType {
		if(type == EToolType.pencil.toString()) {
			return EToolType.pencil;
		}
		else if(type == EToolType.marker.toString()) {
			return EToolType.marker;
		}
		else if(type == EToolType.eraser.toString()) {
			return EToolType.eraser;
		}
		else if(type == EToolType.pointer.toString()) {
			return EToolType.pointer;
		}
		else if(type == EToolType.navigate.toString()) {
			return EToolType.navigate;
		}
		else if(type == EToolType.select.toString()) {
			return EToolType.select;
		}
		else {
			return EToolType.none;
		}
	}
}

export enum EToolType {
	eraser = 'Eraser',
	marker = 'Marker',
	navigate = 'Navigate',
	none = 'None',
	pencil = 'Pencil',
	pointer = 'Pointer',
	select = 'Select',
}