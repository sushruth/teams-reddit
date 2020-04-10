import { observable, action } from "mobx";

class PreviewState {
    @observable enablePreview = false;

    @action togglePreview() {
        this.enablePreview = !this.enablePreview;
    }
}

export const previewState = new PreviewState();