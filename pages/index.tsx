import Head from 'next/head'
import React, { Props } from "react";

export default (props: Props) => {
  const [value, setValue] = React.useState("");
  const [prefectures, setPrefectures] = React.useState("");
  const [municipalities, setMunicipalities] = React.useState("");
  const [address, setAddress] = React.useState("");
  
  React.useEffect(()=>{
    fetch('/api/postcode?post='+value)
  .then(response => response.json())
  .then(data => {
    if(data !== null){ 
    setPrefectures(data.prefectures)
    setMunicipalities(data.municipalities)
    setAddress(data.address)}});
  },[value])
  return (
    <div>
      <h3>郵便番号を入力して下さい</h3>
      <label style={{ display: "block" }}> 
        
        <input type='text'
          placeholder="半角数字で入力"
          maxLength={8}
          size={14}
          value={value}
          onChange={event => setValue(event.target.value.replace("-",""))} />
      </label>
      {prefectures!=""&& <h3>住所</h3>}
      
      {prefectures!=""&& 
      <div><label style={{ display: "block" }}> 
        <input type='text'
          value={prefectures}
          onChange={event => setValue(event.target.value)} /><br/>
      </label>
      <label style={{ display: "block" }}> 
        <input type='text'
          value={municipalities}
          onChange={event => setValue(event.target.value)} /><br/>
      </label>
      <label style={{ display: "block" }}> 
        <input type='text'
          value={address}
          onChange={event => setValue(event.target.value)} /><br/>
        </label></div>}
        
    </div>
  )
}