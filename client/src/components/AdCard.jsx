import React,{useState,useEffect} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { ServeIP } from '../IP';


const AdCard = () => {

    // location 정보 저장
    const [location, setLocation] = useState();
    // 에러 메세지 저장
    const [error, setError] = useState();
    const [ad,setAd]=useState({});

    // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(pos.coords.latitude);

            axios({
                method: 'POST',
                url: `${ServeIP}/ad`,
                data:{lat:pos.coords.latitude,lon:pos.coords.longitude}
            }).then(function (res) {
                if (res.status === 200) {
                    console.log(res.data);
                    setAd(res.data);
                } else if (res.status === 403) {
                    alert("잘못된 접근입니다");
                } else {
                    new Error(res);
                }
            });
    };

    // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
    const handleError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        const { geolocation } = navigator;

        // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
        if (!geolocation) {
        setError("Geolocation is not supported.");
        return;
        }

        // Geolocation API 호출
        geolocation.getCurrentPosition(handleSuccess, handleError, {});
    }, []);

    const header = (
        <img alt="Card" src={ad.imgUrl} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );


    return (
        <div>
            <Card title={ad.title}  style={{ width: '15em' }} header={header}>
                <p className="m-0" style={{lineHeight: '1.5'}}><img src={"http://openweathermap.org/img/wn/"+ad.icon+"@2x.png"} /><br></br>How about this food today??</p>
            </Card>
        </div>
    )
}

export default AdCard;