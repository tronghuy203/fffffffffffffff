import React from "react";
import "./css/style.css";
import raucu1 from "../Demo/images/anhnft1.png";
import raucu2 from "../Demo/images/anhnft2.png";
import raucu3 from "../Demo/images/anhnft3.png";
import anh1 from "../Demo/images/anhbackground2.png";

const Home = () => {
  return (
    <div id="homemain">
      <div id="home1">
        <div className="home1-left">
          <h1 className="h1-title">
            Chào mừng đến với
            <span id="title-1"> nền tảng NFT </span> của chúng tôi.
          </h1>
          <p id="home-content">
            Trang web của chúng tôi là nơi bạn có thể khám phá, mua bán, và sở
            hữu những tác phẩm nghệ thuật số độc đáo dưới dạng NFT (Non-Fungible
            Token). Với sứ mệnh mang lại sự kết nối giữa nghệ sĩ và người sưu
            tầm, chúng tôi cam kết cung cấp một nền tảng an toàn, minh bạch và
            dễ sử dụng.
          </p>
        </div>
        <div className="home1-right">
          <img src={raucu1} alt="Rau Cu 1" />
          <img src={raucu2} alt="Rau Cu 2" />
          <img src={raucu3} alt="Rau Cu 3" />
        </div>
      </div>
      <div id="home2">
        <div className="home2-left">
          <img src={anh1} alt="Anh 1" />
        </div>
        <div className="home2-right">
          <h1 id="home2-title">
            Chào mừng đến với nền tảng NFT, nơi bạn có thể sở hữu
            các tác phẩm nghệ thuật số độc đáo
          </h1>
          <p id="home2-content">
            Bạn đam mê nghệ thuật và muốn sở hữu những tác phẩm nghệ thuật số
            độc đáo? Hãy tham gia nền tảng NFT của chúng tôi, nơi bạn có thể
            khám phá, mua bán và sưu tầm các tác phẩm nghệ thuật từ các nghệ sĩ
            nổi tiếng và các nghệ sĩ mới. Tại đây, mỗi tác phẩm nghệ thuật đều
            là một NFT (Non-Fungible Token), đảm bảo tính độc nhất và không thể
            sao chép. Chúng tôi cung cấp một nền tảng an toàn, minh bạch và dễ
            sử dụng để bạn có thể thoải mái tham gia vào thế giới NFT. Bấm vào
            đây để khám phá các tác phẩm nghệ thuật số tuyệt vời và bắt đầu hành
            trình sở hữu NFT ngay hôm nay!
          </p>
          <button>Đến Ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
