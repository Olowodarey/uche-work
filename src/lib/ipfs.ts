import { create } from 'ipfs-http-client'

// IPFS configuration
const IPFS_URL = 'https://ipfs.infura.io:5001'
const IPFS_PROJECT_ID = process.env.VITE_IPFS_PROJECT_ID || ''
const IPFS_PROJECT_SECRET = process.env.VITE_IPFS_PROJECT_SECRET || ''

// Create IPFS client
export const ipfs = create({
  url: IPFS_URL,
  headers: {
    authorization: `Basic ${Buffer.from(`${IPFS_PROJECT_ID}:${IPFS_PROJECT_SECRET}`).toString('base64')}`,
  },
})

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  hash: string;
  path: string;
  size: number;
}

// Upload file to IPFS with progress tracking
export const uploadToIPFS = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    const fileBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(fileBuffer)
    
    // Simulate progress for demo (in production, you'd get actual progress from IPFS)
    if (onProgress) {
      let loaded = 0
      const total = file.size
      const interval = setInterval(() => {
        loaded += Math.min(total * 0.1, total - loaded)
        onProgress({
          loaded,
          total,
          percentage: Math.round((loaded / total) * 100)
        })
        if (loaded >= total) {
          clearInterval(interval)
        }
      }, 200)
    }
    
    const result = await ipfs.add({
      path: file.name,
      content: uint8Array
    })
    
    return {
      hash: result.cid.toString(),
      path: result.path,
      size: result.size
    }
  } catch (error) {
    console.error('IPFS upload error:', error)
    throw new Error('Failed to upload file to IPFS')
  }
}

// Download file from IPFS
export const downloadFromIPFS = async (hash: string): Promise<Uint8Array> => {
  try {
    const chunks = []
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk)
    }
    
    // Combine chunks into single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    
    for (const chunk of chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }
    
    return result
  } catch (error) {
    console.error('IPFS download error:', error)
    throw new Error('Failed to download file from IPFS')
  }
}

// Get IPFS URL for viewing
export const getIPFSUrl = (hash: string): string => {
  return `https://ipfs.io/ipfs/${hash}`
}