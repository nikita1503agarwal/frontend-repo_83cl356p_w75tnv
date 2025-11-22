import { useRef, useState } from 'react'
import { Upload, X, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import { formatBytes } from '../lib/utils'

export default function UploadScreen() {
  const { uploadedFiles, addFile, updateFileProgress, updateFileStatus, removeFile } = useAppStore()
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      const item = { name: file.name, size: file.size, type: file.type }
      addFile(item)
      const id = useAppStore.getState().uploadedFiles.slice(-1)[0].id
      // Simulate upload
      let p = 0
      const interval = setInterval(() => {
        p += 10
        updateFileProgress(id, Math.min(100, p))
        if (p >= 100) {
          clearInterval(interval)
          updateFileStatus(id, 'success')
        }
      }, 200)
    })
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-white">Upload Medical Reports</h2>
      <p className="text-slate-300/90">Upload your medical reports, lab results, or imaging files for AI analysis</p>

      <div
        className={"mt-6 p-10 rounded-2xl border-2 border-dashed backdrop-blur-xl " + (dragOver ? 'border-blue-400 bg-white/10' : 'border-white/10 bg-white/5')}
        onDragOver={(e)=>{e.preventDefault(); setDragOver(true)}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={(e)=>{ e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      >
        <div className="text-center text-slate-200">
          <div className="mx-auto w-14 h-14 rounded-full grid place-items-center text-white" style={{ background: 'linear-gradient(135deg, #667EEA, #F093FB)'}}>
            <Upload />
          </div>
          <div className="mt-3 font-medium">Drop files here</div>
          <div className="text-slate-400">or click to browse</div>
          <div className="mt-4">
            <button onClick={()=>inputRef.current?.click()} className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-[#667EEA] to-[#764BA2]">Select Files</button>
          </div>
          <div className="mt-2 text-xs text-slate-400">Supported: .pdf, .jpg, .jpeg, .png, .dcm, .txt, .csv</div>
        </div>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e)=> handleFiles(e.target.files)} />
      </div>

      {/* Uploaded list */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Uploaded Files ({uploadedFiles.length})</h3>
          <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#667EEA] to-[#764BA2]">Analyze All Files</button>
        </div>
        <div className="mt-4 space-y-3">
          {uploadedFiles.map(f => (
            <div key={f.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)'}}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="text-slate-200 truncate max-w-[200px]">{f.name}</div>
                    <div className="text-slate-400 text-sm">{formatBytes(f.size)} • {new Date(f.uploadedAt).toLocaleTimeString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {f.status === 'uploading' && <Loader2 className="animate-spin text-slate-300" size={18} />}
                  {f.status === 'success' && <CheckCircle2 className="text-emerald-400" size={18} />}
                  {f.status === 'error' && <AlertCircle className="text-red-400" size={18} />}
                  <button onClick={()=>removeFile(f.id)} className="p-2 rounded-lg hover:bg-white/10 text-slate-300"><X size={16} /></button>
                </div>
              </div>
              {f.status === 'uploading' && (
                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#667EEA] to-[#F093FB]" style={{ width: `${f.progress}%`}} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          {icon:'🔒',title:'Secure & Private',desc:'Your files are encrypted'},
          {icon:'🤖',title:'AI Analysis',desc:'6 specialist agents analyze automatically'},
          {icon:'⚡',title:'Instant Results',desc:'Get analysis in under 30 seconds'},
        ].map((c,i)=>(
          <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 text-slate-200">
            <div className="text-2xl">{c.icon}</div>
            <div className="font-semibold">{c.title}</div>
            <div className="text-slate-400">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
