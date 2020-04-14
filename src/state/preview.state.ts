import { action, observable } from 'mobx'

class PreviewState {
  @observable enablePreview = false

  @action togglePreview() {
    this.enablePreview = !this.enablePreview
  }
}

export const previewState = new PreviewState()
