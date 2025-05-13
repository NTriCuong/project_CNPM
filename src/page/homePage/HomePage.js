import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import Banner from "./component/banner/Banner";
import "./style.css";
import Footer from "../../component/footer/Footer";
import ChatBox from "../../component/chatBox/ChatBox";
import Discovery from "./component/discovery/Discovery";
import  apiGeoCode  from "../../api/apiGeoCode";
import { useEffect } from "react";

function HomePage() {

  //location khách hàng
  useEffect(() => {
    apiGeoCode();
  },[]);
  return (
    <div class="constainer">
      <Menu />
      <Banner />
      <FlightSearchBox className={"search-box"} />
      <ChatBox />
      <Discovery />
      <Footer />
    </div>
  );
}
export default HomePage;
