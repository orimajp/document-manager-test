import * as monacoEditor from 'monaco-editor'
import { Ref, watch } from '@vue/composition-api'
import AssetLinkContainer from '~/containers/AssetLinkContainer'
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor
import IIdentifiedSingleEditOperation = monacoEditor.editor.IIdentifiedSingleEditOperation

const createAssetLinkString = (fileName: string, location: string) => {
  return `![${fileName}](${location})`
}

export const useEditorInsertAssetLink = (
  editor: Ref<IStandaloneCodeEditor | null>
) => {
  const {
    assetFileNameRef,
    assetLocationRef,
    clearAsset
  } = AssetLinkContainer.useContainer()

  watch(
    () => assetLocationRef.value,
    (newVal) => {
      if (newVal !== '') {
        insertAssetLink()
      }
    }
  )

  const createAssetLink = () => {
    return createAssetLinkString(assetFileNameRef.value, assetLocationRef.value)
  }

  // https://stackoverflow.com/questions/41642649/how-do-i-insert-text-into-a-monaco-editor
  // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.icodeeditor.html#executeedits
  // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.iidentifiedsingleeditoperation.html
  const insertAssetLink = () => {
    const line = editor.value!.getPosition() as monacoEditor.Position
    const range = new monacoEditor.Range(line.lineNumber, 1, line.lineNumber, 1)
    const insertLink = createAssetLink()
    const option = {
      range,
      forceMoveMarkers: true,
      text: insertLink
    } as IIdentifiedSingleEditOperation
    editor.value!.executeEdits('', [option])
    editor.value!.focus()
    clearAsset()
  }

  return {}
}
