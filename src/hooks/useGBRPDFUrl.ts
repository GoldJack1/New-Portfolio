import { useState, useEffect, useCallback } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

const GBR_PDF_PATH = 'Projects/GBR/Final Outcome PDF Compressed.pdf'

const STORAGE_NOT_CONFIGURED = new Error(
  "Firebase Storage is not configured. Add VITE_FIREBASE_STORAGE_BUCKET to your .env (e.g. your-project.firebasestorage.app). See .env.example."
)

let cachedUrl: string | null = null
let prefetchPromise: Promise<string> | null = null

function getDownloadUrl(): Promise<string> {
  if (!storage) return Promise.reject(STORAGE_NOT_CONFIGURED)
  if (cachedUrl) return Promise.resolve(cachedUrl)
  if (prefetchPromise) return prefetchPromise
  prefetchPromise = getDownloadURL(ref(storage, GBR_PDF_PATH))
  prefetchPromise.then((url) => {
    cachedUrl = url
    prefetchPromise = null
  })
  return prefetchPromise
}

/**
 * Prefetch the GBR PDF URL and trigger background download of the PDF.
 * Call when the user is likely to open the GBR page (e.g. when Projects page mounts).
 */
export function prefetchGBRPDFUrl(): void {
  if (!storage) return
  getDownloadUrl().then((url) => {
    if (typeof document === 'undefined') return
    const existing = document.querySelector(`link[rel="prefetch"][href="${url}"]`)
    if (existing) return
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    link.as = 'document'
    document.head.appendChild(link)
  }).catch(() => {
    prefetchPromise = null
  })
}

export function useGBRPDFUrl() {
  const [url, setUrl] = useState<string | null>(() => cachedUrl)
  const [loading, setLoading] = useState(() => !cachedUrl)
  const [error, setError] = useState<Error | null>(null)

  const fetchUrl = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const downloadUrl = await getDownloadUrl()
      cachedUrl = downloadUrl
      setUrl(downloadUrl)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load PDF'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cachedUrl) {
      setUrl(cachedUrl)
      setLoading(false)
      return
    }
    fetchUrl()
  }, [fetchUrl])

  return { url, loading, error, retry: fetchUrl }
}
