import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import DrawEnableView from 'src/view/DrawEnableView';
import { ICON_PLUGIN, PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from 'src/constants';
import { EToolType, Tool } from './tool/tool';

export interface DrawEnablePluginSettings {
	MouseDefaultTool: EToolType,
	TouchDefaultTool: EToolType,
	PenDefaultTool: EToolType
}

export const DEFAULT_SETTINGS: DrawEnablePluginSettings = {
	MouseDefaultTool: EToolType.select,
	TouchDefaultTool: EToolType.navigate,
	PenDefaultTool: EToolType.pencil,
};

export default class DrawEnablePlugin extends Plugin {
	settings: DrawEnablePluginSettings;

	async onload() {
		await this.setupSettingsTab();

		// Register DrawEnableView
		this.registerView(VIEW_TYPE_DRAWENABLE, (leaf) => new DrawEnableView(leaf, this.settings));

		// Add an Icon for Activating DrawEnableView
		this.addRibbonIcon(ICON_PLUGIN, 'Open ' + PLUGIN_DISPLAY_NAME, () => {
			this.activateView();
		});

		// Update non time critical UI at Intervall
		this.registerInterval(window.setInterval(() => {
			this.updateUI();
		}, 500));
	}

	// Update UI
	updateUI() {
		console.debug('UI Update');
	}

	async setupSettingsTab() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_DRAWENABLE);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		}
		else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			const leaf = workspace.getRightLeaf(false);
			if (leaf) {
				await leaf.setViewState({ type: VIEW_TYPE_DRAWENABLE, active: true });
			}
		}

		// 'Reveal' the leaf in case it is in a collapsed sidebar
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}
}

export class SettingTab extends PluginSettingTab {
	plugin: DrawEnablePlugin;

	constructor(app: App, plugin: DrawEnablePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Mouse Default Tool')
			.setDesc('Whitch tool should be used if Input change to mouse.')
			.addDropdown((component) => component
				.addOption(EToolType.eraser.toString(), EToolType.eraser.toString())
				.addOption(EToolType.marker.toString(), EToolType.marker.toString())
				.addOption(EToolType.navigate.toString(), EToolType.navigate.toString())
				.addOption(EToolType.none.toString(), EToolType.none.toString())
				.addOption(EToolType.pencil.toString(), EToolType.pencil.toString())
				.addOption(EToolType.pointer.toString(), EToolType.pointer.toString())
				.addOption(EToolType.select.toString(), EToolType.select.toString())
				.setValue(this.plugin.settings.MouseDefaultTool.toString())
				.onChange(async (value) => {
					this.plugin.settings.MouseDefaultTool = Tool.StringToType(value);
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Pen Default Tool')
			.setDesc('Whitch tool should be used if Input change to pen.')
			.addDropdown((component) => component
				.addOption(EToolType.eraser.toString(), EToolType.eraser.toString())
				.addOption(EToolType.marker.toString(), EToolType.marker.toString())
				.addOption(EToolType.navigate.toString(), EToolType.navigate.toString())
				.addOption(EToolType.none.toString(), EToolType.none.toString())
				.addOption(EToolType.pencil.toString(), EToolType.pencil.toString())
				.addOption(EToolType.pointer.toString(), EToolType.pointer.toString())
				.addOption(EToolType.select.toString(), EToolType.select.toString())
				.setValue(this.plugin.settings.PenDefaultTool.toString())
				.onChange(async (value) => {
					this.plugin.settings.PenDefaultTool = Tool.StringToType(value);
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Touch Default Tool')
			.setDesc('Whitch tool should be used if Input change to touch.')
			.addDropdown((component) => component
				.addOption(EToolType.eraser.toString(), EToolType.eraser.toString())
				.addOption(EToolType.marker.toString(), EToolType.marker.toString())
				.addOption(EToolType.navigate.toString(), EToolType.navigate.toString())
				.addOption(EToolType.none.toString(), EToolType.none.toString())
				.addOption(EToolType.pencil.toString(), EToolType.pencil.toString())
				.addOption(EToolType.pointer.toString(), EToolType.pointer.toString())
				.addOption(EToolType.select.toString(), EToolType.select.toString())
				.setValue(this.plugin.settings.TouchDefaultTool.toString())
				.onChange(async (value) => {
					this.plugin.settings.TouchDefaultTool = Tool.StringToType(value);
					await this.plugin.saveSettings();
				}));
	}
}
