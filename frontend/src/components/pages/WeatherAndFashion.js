import React, { useEffect, useState } from 'react';
import key from '../../apikey.js';
import axios from 'axios';
import address from '../../API_KEY';
import './WeatherAndFashion.css';
// import './Weather.css';
import './Weather.css';


const cityNamesMap = {
    '서울': 'Seoul',
    '부산': 'Busan',
    '인천': 'Incheon',
    '대구': 'Daegu',
    '대전': 'daejeon',
    '광주': 'gwangju',
    '울산': 'ulsan',
    '제주': 'jeju',
    '고양': 'goyang',
    '세종': 'sejong',
    '용인': 'yongin',
    '용산': 'yongsan',
    '파주': 'paju'
};

const WeatherAndFashion = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [fashionData, setFashionData] = useState([]);

    useEffect(() => {
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            
            return `${month}월 ${date}일 `;
        };

        const fetchWeatherData = async () => {
            try {
                const WEATHER_API_KEY = key.WEATHER_API_KEY;
                const cityNameInEnglish = cityNamesMap[cityName] || cityName;
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInEnglish},kr&appid=${WEATHER_API_KEY}`);
                setWeatherData(weatherResponse.data);
                await axios.get(`${address.backendaddress}/csvToDatabase`, {withCredentials : true});
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);
        
        if (cityName.trim() !== '') {
            fetchWeatherData();
        }

    }, [cityName]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleFashionButtonClick = async () => {
        try {
            await getFashionData();
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    };

    const getFashionData = async () => {
        try {
            const response = await axios.get(`${address.backendaddress}/api/fashion`);
            const filteredFashionData = response.data.filter((item, index) => index !== 0);
            // Remove double quotes from image URLs
            const formattedFashionData = filteredFashionData.map(item => ({
                ...item,
                image: item.image.replace(/"/g, ''),
                description: item.description.replace(/"/g, '')
            }));
            setFashionData(formattedFashionData);
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    };

    return (
        
        <div style={{ margin: 'auto' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
        <input type="text" value={cityName} className="weather_InputContainer" onChange={(e) => setCityName(e.target.value)} placeholder="지역명을 입력해주세요" />
    </div>
</form>

            
            {/* <span className="nowtime">{currentTime}</span> */}
            {/* <span className='weather_under'>현재날씨</span> */}
            {weatherData && (
                <div style={{textAlign: 'center'}}>
                    {/* <h3>{weatherData.weather[0].description}</h3>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} width={150} height={150} /> */}


{/* @@@@@ */}

                <div class="cmp-cur-weather wbg wbg-type2 BGDB00">
                    {/* <h3 class="hid">현재 날씨</h3>	 */}
                    <ul class="wrap-1">
                        <li class="w-icon w-temp no-w">
                            <span class="hid">{currentTime}{cityName}의 기온 </span><span class="wic DB00 large"></span>
                            {/* <span class="hid"> : </span><span class="tmp">19.0<small>℃</small> <span class="minmax"><span>최저</span><span>-</span><span>최고</span><span>-</span></span></span> */}
                            {/* <span class="chill">체감(18.3℃)</span> */}
                        </li>
		
			
		
	</ul>
	<ul class="wrap-2 no-underline">
		<li><span class="lbl ic-hm">현재 기온<small>&nbsp;</small></span><span class="val">{weatherData.main.temp}℃</span></li>
		
		<li><span class="lbl ic-wind">최저 기온<small>&nbsp;</small></span><span class="val">{weatherData.main.temp_min}℃</span></li>
		
		<li><span class="lbl rn-hr1 ic-rn">최대 기온</span><span class="val">{weatherData.main.temp_max}℃</span></li>
	</ul>
</div>

                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto', marginTop: '10px' }}>
                        <h3 style={{ marginRight: '20px' }}>현재기온: {weatherData.main.temp}</h3>
                        <h3 style={{ marginRight: '20px' }}>최저기온: {weatherData.main.temp_min}</h3>
                        <h3>최대기온: {weatherData.main.temp_max}</h3>
                    </div> */}
                </div>
            )}
            <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
                <div>
                    <button onClick={handleFashionButtonClick} className='datalook_button'>STYLING</button>
                </div>
                <div>
                    <div style={{ display: 'flex',justifyContent:'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {fashionData.map((item, index) => (
                            <div key={index} style={{ marginRight: '20px', marginBottom: index % 4 === 3 ? '20px' : '0', width: '23%' }}>
                                <img src={item.image} alt={item.description} width={150} />
                                <h6 className='desc'>{item.description}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
        
    );
};

export default WeatherAndFashion;
