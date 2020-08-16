import { useAxios } from '~/hooks/useAxios'
import { UploadResponse } from '~/models/asset/UploadResponse'

// https://serversideup.net/uploading-files-vuejs-axios/
export const useAssetApi = () => {
  const { axios } = useAxios()

  const uploadAsset = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    return await axios
      .post('/api/assets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => res.data)
  }

  return {
    uploadAsset
  }
}
