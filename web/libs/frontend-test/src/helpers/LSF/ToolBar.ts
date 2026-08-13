export const ToolBar = {
  _controlsSelector: ".lsf-controls",

  get sectionOne() {
    return cy.get(".lsf-topbar").find(".lsf-topbar__group").eq(0);
  },

  get sectionTwo() {
    // Production UI uses bottom bar for controls
    return cy.get(".lsf-bottombar");
  },

  get controls() {
    return this.sectionTwo.find(this._controlsSelector);
  },

  get controlButtons() {
    return this.controls.find("button");
  },

  get viewAllBtn() {
    return this.sectionOne.find('[aria-label="比较所有标注"]');
  },

  get submitBtn() {
    return this.sectionTwo.find('[aria-label="提交当前标注"]');
  },

  get updateBtn() {
    // New UI (BottomBar): main update button has data-testid; old UI had aria-label "Update current annotation"
    return this.sectionTwo.find('[data-testid="bottombar-update-button"], [aria-label="更新当前标注"]');
  },

  get annotationDropdownTrigger() {
    return this.sectionOne.find(".lsf-annotation-button__trigger");
  },

  get dropdownMenu() {
    return cy.get(".lsf-dropdown");
  },

  clickCopyAnnotationBtn() {
    this.annotationDropdownTrigger.click();
    this.dropdownMenu.find('[class*="option--"]').contains("Duplicate Annotation").click();
  },
};
