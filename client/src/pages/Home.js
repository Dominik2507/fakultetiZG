import React from "react";
import styled from "styled-components";


const Home = (props) => {
  
  return (
    <>
      <MojDiv>
        <h1>Podatci o fakultetima</h1>
        
        <p>
          <h2>Aplikacija</h2>
          <div>Web Aplikacija prikazuje podatke o fakultetima koje su sastavnice Sveučilišta u Zagrebu.</div>
          <div>Tablički prikaz podataka: <a href="/datatable"> DATATABLE</a></div>
          <div>Podatci u CSV formatu: <a href="./file.csv" download="fakulteti" target="_blank">preuzmi-CSV</a></div>
          <div>Podatci u JSON formatu: <a href="./file.json" download="fakulteti" target="_blank">preuzmi-JSON</a></div><br/>
          Podatci se nalaze u lokalnoj bazi podataka koja sadrži dvije tablice (Fakultet i Smjer). 
          Tablica Fakultet sadrži osnovne informacije o fakultetima. 
          Tablica Smjer sadrži zapise o smjerovima za fakultete navedene u tablici Fakultet. <br/><br/>
          Podatke sam našao na stranici ISVU-a (INFORMACIJSKI SUSTAV VISOKIH UČILIŠTA). <br/>
          
          <ul>
          Korisni linkovi:
            <li> <a href="https://wiki.srce.hr/display/TUT/ISVU+Otvoreni+podaci">https://wiki.srce.hr/display/TUT/ISVU+Otvoreni+podaci</a> </li>
            <li><a href="https://www.isvu.hr/visokaucilista/hr/pocetna "> https://www.isvu.hr/visokaucilista/hr/pocetna </a></li>
          </ul>
          <br/>
          <section>
          <ul>
          U tablici Fakultet nalaze se atributi:
            <li>ime (ime fakulteta)</li>
            <li>adresa</li>
            <li>dekan</li>
            <li>eAdresa (email adresa dekanata)</li>
            <li>faks</li>
            <li>telefon</li>
            <li>webadresa</li>
            <li>id</li>
          </ul>
          <ul>
            Atributi Smjer-a:
              <li>imeStudija</li>
              <li>razinaStudija (npr. preddiplomski, diplomski, poslijediplomski)</li>
              <li>brojSemestara</li>
              <li>načinIzvedbe (redovni, izvanredni)</li>
              <li>akGodina</li>
              <li>fakultetId</li>
          </ul>
          </section>
          <h2>Dozvole</h2>
          <h3>SRCE</h3>
          <div>
          Podaci su ustupljeni pod Otvorenom dozvolom/Open Licence - The Republic of Croatia te je obveza korisnika da pri uporabi tih podataka postupa u skladu s njom.<br/><br/>
          Otvoreni pristup (eng. Open Access, OA) je slobodan, besplatan i neometan mrežni pristup digitalnim znanstvenim informacijama koji omogućava čitanje, pohranjivanje, distribuciju, pretraživanje, dohvaćanje, 
          indeksiranje i/ili drugo zakonito korištenje. Slobodan u ovom kontekstu znači trajno slobodan od bilo kakvih ograničenja i postavljanja uvjeta za pristup i korištenje. (Hrvatska deklaracija o otvorenom pristupu)

          </div>
        </p>
        
      </MojDiv>

    
    </>
  );
  
};

export default Home;

const MojDiv= styled.div`
  width: 100%;
  h1{
    width:100%;
    font-size: 2rem;
    padding: 20px;
    background-color: lightgray;
  }
  p{
    padding: 40px;
  }
  ul{
    li{
      margin-left: 30px;
    }
  }
  section{
    display: flex;
    gap: 50px;
    padding-bottom:20px;
  }
  h2{
    font-size: 1.5rem;
    padding-bottom: 10px;
  }
  h3{
    font-size: 1.5rem;
    padding: 10px; 
    
  }
  h2 + div {padding-bottom: 15px; padding-left: 15px;}
  h3 + div {padding: 10px}
`;
