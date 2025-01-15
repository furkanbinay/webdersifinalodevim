import React from 'react';

const translateConditions = (condition) => {
    const translations = {
        "Partially cloudy": "Parçalı Bulutlu",
        "Clear": "Açık",
        "Rain": "Yağmurlu",
        "Snow": "Karlı",
        "Cloudy": "Bulutlu",
        "Sunny": "Güneşli",
        "Thunderstorm": "Fırtınalı",
        "Rain, Partially cloudy":"Yağmurlu, Parçalı Bulutlu",
        "Overcast":"Bulutlu"
    };
    return translations[condition] || condition;
};

class Weather extends React.Component{
    render() {
        return(
            <div className="hava_bilgisi">
                {
                    this.props.city &&  <p className="Form_icerik"> Yer:
                        <span className="gelen_deger"> { this.props.city }</span>
                    </p>
                }
                {
                    this.props.temperature && <p className="Form_icerik"> Sıcaklık:
                        <span className="gelen_deger"> { this.props.temperature } </span>
                    </p>
                }
                {
                    this.props.humidity && <p className="Form_icerik"> Nem:
                        <span className="gelen_deger"> %{ this.props.humidity } </span>
                    </p>
                }
                {
                    this.props.conditions && <p className="Form_icerik"> Hava Durumu:
                        <span className="gelen_deger"> { translateConditions(this.props.conditions) } </span>
                    </p>
                }
                {
                    this.props.error && <p className="hata">{ this.props.error }</p>
                }
            </div>
        );
    }
}

export default Weather;
