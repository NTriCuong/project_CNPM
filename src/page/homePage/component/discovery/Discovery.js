import './style.css';  // Đảm bảo đường dẫn đúng
import anh1 from '../../../../image/Icon/DiscoverSection/anh1.png';
import anh2 from '../../../../image/Icon/DiscoverSection/anh2.jpg';
import anh3 from '../../../../image/Icon/DiscoverSection/anh3.png';
import iconphu from '../../../../image/Icon/DiscoverSection/iconphu.svg';

function Discovery() {
  const discoverDestinations = [
    {
      id: 1,
      name: "Glenfinan viaduct",
      location: "United Kingdom",
      image: anh1,
      width: 467,
      height: 735
    },
    {
      id: 2,
      name: "Linh Sơn Bưu",
      location: "Vietnam",
      image: anh2,
      width: 467,
      height: 735
    },
    {
      id: 3,
      name: "Ginos Baifern",
      location: "Turkey",
      image: anh3,
      width: 467,
      height: 735
    },
    {
      id: 4,
      name: "Ginos Baifern",
      location: "Germany",
      image: anh3,
      width: 467,
      height: 735
    },
    {
      id: 5,
      name: "Ginos Baifern",
      location: "Germany",
      image: anh3,
      width: 467,
      height: 735
    },
    {
      id: 6,
      name: "Ginos Baifern",
      location: "Germany",
      image: anh3,
      width: 467,
      height: 735
    }
  ];

  return (
    <div className="discovery-main-container">
      {/* Thẻ div chứa chữ "Khám Phá" ngang chiếm 10% chiều cao */}
      <div className="horizontal-title-section">
        <h2 className="discover-title-horizontal">
          Khám Phá
          <div className="horizontal-title-underline"></div>
        </h2>
      </div>
  
      {/* Thẻ div thứ hai chứa các destination cards, chiếm phần còn lại (90%) */}
      <div className="content-section">
        {/* Thẻ div chứa chữ "Khám Phá" dọc, chiếm 5% chiều rộng trái */}
        <div className="vertical-title-section">
          <h2 className="discover-title-vertical">
            Khám Phá
          </h2>
        </div>

        {/* Thêm chữ "Điểm Đến" nằm ngang và cách "Khám Phá" dọc 5px */}
        <div className="destination-title-section">
          <h2 className="destination-title">
            Điểm Đến
          </h2>
        </div>

        {/* Thẻ div chứa tất cả các destination cards, chiếm phần còn lại (70%) */}
        <div className="cards-container-section">
          <div className="discover-destinations">
            {discoverDestinations.map((destination) => (
              <div 
                key={destination.id} 
                id={`destination-${destination.id}`} 
                className="destination-card"
              >
                <div className="image-wrapper">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className={`destination-image img-${destination.id}`}
                    width={destination.width}
                    height={destination.height}
                  />
                </div>
                <div className="destination-info">
                <h3 className="destination-name" >     
                    {destination.name}
                  </h3>
                  <p className="destination-location"><img src={iconphu} alt="icon" className="icon-phu" />{destination.location}</p>
                  <button className="go-button">GO</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discovery;
