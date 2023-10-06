
function Input(props: any) {
    const {data, setData, label} = props; 
     
  return (
    <>
    <label htmlFor="">
        {label}
    </label>  
     
        <input type="text" placeholder={data?? ''} value={data} onChange={(e) => setData(e.target.value)} />    
    </>
  )
}

export default Input