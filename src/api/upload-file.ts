import { api } from '@/lib/axios'

type UploadAttachmentResponse = {
  attachments: Array<{
    id: string
    url: string
  }>
}

export async function uploadFile(file: File) {
  const response = await api.post<UploadAttachmentResponse>(
    '/attachments',
    {
      files: file,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}
