
import UnityPlayer from '../components/unity/UnityPlayer'
export default function NovelPage() {
  return (
    <div style={{width:'100%', height:'calc(100vh - 65px)', backgroundColor:'#000', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <UnityPlayer />
    </div>
  )
}
