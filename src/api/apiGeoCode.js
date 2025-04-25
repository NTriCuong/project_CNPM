const apiKey = 'fb73cdf7937846ff8800dec118878dab';
const apiGeoCode = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
        );
        const data = await response.json();

        console.log("Dữ liệu API:", data); // debug

        if (
          data.results &&
          data.results.length > 0 &&
          data.results[0].components
        ) {
          const components = data.results[0].components;
          const city =
            components.city ||
            components.town ||
            components.village ||
            "Không xác định";

          console.log("Thành phố:", city);
        } else {
          console.warn("Không có thông tin thành phố trong phản hồi.");
        }
      } catch (error) {
        console.error("Lỗi khi fetch API OpenCage:", error);
      }
    },
    (error) => {
      console.error("Không thể lấy vị trí người dùng:", error.message);
    }
  );
};

export default apiGeoCode;
