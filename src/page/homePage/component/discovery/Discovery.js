import './style.css'
import anh1 from'../../../../image/Icon/HomePage/anh1.jpg'
import anh2 from'../../../../image/Icon/HomePage/anh2.png'

function Discovery(){
    const discoverDestinations = [
        {
          id: 1,
          name: "Glenfinn viaduct",
          location: "United Kingdom",
          image: anh1
        },
        {
          id: 2,
          name: "Linh Sơn Bưu",
          location: "Vietnam",
          image: anh2
        },
        {
          id: 3,
          name: "Ginos Baiern",
          location: "Germany",
          image: "/path/to/ginos-baiern-image.jpg"
        }
      ];
return(<>
    {/* Khám Phá Section */}
    <div className="discover-section">
    <h2 className="discover-title">Khám Phá</h2>
    <div className="discover-destinations">
      {
      discoverDestinations.map((destination) => (
        <div key={destination.id} className="destination-card">
          <img src={destination.image} alt={destination.name} />
          <div className="destination-info">
            <h3>{destination.name}</h3>
            <p>{destination.location}</p>
            <button className="go-button">GO</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  </>
)
}
export default Discovery;