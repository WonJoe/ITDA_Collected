import React, { useEffect , useState } from 'react';
import './LocationWrite.css';
import api from '../../API_KEY';
import mapStyle from '../../mapStyle';

const LocationWrite = ({ setCreateData, toggleLocationWrite }) => {

    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    
    useEffect(() => {

        let map;
        let marker;
        
        let itwillLat = 37.498682;
        let itwillLng = 127.031897;

        let infowindow
        let infoWindowLoc

        // function createCenterControl() {
        //     const controlButton = document.createElement("button");
          
        //     // Set CSS for the control.
        //     controlButton.style.backgroundColor = "#cc99cc";
        //     controlButton.style.border = "2px solid #fff";
        //     controlButton.style.borderRadius = "3px";
        //     controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        //     controlButton.style.color = "#ffffff";
        //     controlButton.style.cursor = "pointer";
        //     controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
        //     controlButton.style.fontSize = "16px";
        //     controlButton.style.lineHeight = "38px";
        //     controlButton.style.margin = "8px 0 22px";
        //     controlButton.style.padding = "0 5px";
        //     controlButton.style.textAlign = "center";
        //     controlButton.textContent = "주소 선택 완료";
        //     controlButton.title = "위치 보내기";
        //     controlButton.type = "button";
        //     controlButton.addEventListener("click", handleAddressSelect);
        //     return controlButton;
        //   }

        function initMap() {

            if (window.google && window.google.maps) {
                map = new window.google.maps.Map(document.getElementById("map"), {
                    center: { lat: itwillLat, lng: itwillLng },
                    zoom: 17,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    styles: mapStyle.styles
                });

                let contentStrings =
                '<div id="content">' +
                '<h3 id="firstHeading" class="firstHeading">내 위치로 이동했습니다.</h3>' +
                '<div id="bodyContent">' +
                "<p><b>정확한 주소를 선택해 주세요.</b></p>" +
                "</div>" +
                "</div>";

                infoWindowLoc = new window.google.maps.InfoWindow({});

                // -----------------------(중하단 버튼)--------------------------------
                // const centerControlDiv = document.createElement("div");
                // const centerControl = createCenterControl();
                // centerControlDiv.appendChild(centerControl);
                // map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                // -------------------------------------------------------
                // -----------------------(중상단 버튼)--------------------------------

                const locationButton = document.createElement("button");

                locationButton.textContent = "내 위치 찾기";
                locationButton.classList.add("custom-map-control-button");
                locationButton.style.backgroundColor = "#cc99cc";
                locationButton.style.border = "2px solid #fff";
                locationButton.style.borderRadius = "3px";
                locationButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                locationButton.style.color = "#ffffff";
                locationButton.style.cursor = "pointer";
                locationButton.style.fontFamily = "Roboto,Arial,sans-serif";
                locationButton.style.fontSize = "20px";
                locationButton.style.lineHeight = "50px";
                locationButton.style.margin = "8px 0 22px";
                locationButton.style.padding = "0 5px";
                locationButton.style.textAlign = "center";
                locationButton.title = "위치 찾기";
                locationButton.type = "button";
                map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
                
                locationButton.addEventListener("click", () => {

                    

                    if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        infoWindowLoc.setPosition(pos);
                        infoWindowLoc.setContent(contentStrings);
                        infoWindowLoc.open(map);
                        map.setCenter(pos);
                        },
                        () => {
                        handleLocationError(true, infoWindowLoc, map.getCenter());
                        }
                    );
                    } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindowLoc, map.getCenter());
                    }

                


                })
                

                function handleLocationError(browserHasGeolocation, infoWindowLoc, pos) {
                    infoWindowLoc.close();
                    infoWindowLoc.setPosition(pos);
                    infoWindowLoc.setContent(
                    browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
                );
                infoWindowLoc.open(map);
                
                }
                // -------------------------------------------------------

                let location = {
                    lat: itwillLat,
                    lng: itwillLng
                };
    
                let firstLocation = new window.google.maps.LatLng(location.lat, location.lng);
                initMapWithLocation(firstLocation);
    
                getLocation();
            }
        }

        function getLocation() {
            let geolocationTimeout;
            
            if (navigator.geolocation) {
                geolocationTimeout = setTimeout(() => {
                    alert("사용자 위치를 가져오는 데 시간이 너무 오래 걸립니다.");
                }, 15000);
                
                navigator.geolocation.getCurrentPosition((position) => {
                    clearTimeout(geolocationTimeout);
                    initMapWithLocation(position);
                    }, (error) => {
                    clearTimeout(geolocationTimeout);
                    console.error("사용자 위치를 가져오는데 실패했습니다:", error);
                    alert("사용자 위치를 가져오는 데 실패했습니다.");
                    let position = {
                        coords : {
                            latitude : itwillLat,
                            longitude : itwillLng
                        }
                    }
                    initMapWithLocation(position);
                });
            } else {
                alert("이 브라우저는 내위치 불러오기를 지원하지 않습니다.");
            }
        }

        function initMapWithLocation(position) {
            if (position && position.coords) {
                let location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
        
                let newLocation = new window.google.maps.LatLng(location.lat, location.lng);
        
                reverseGeocode(newLocation);
                placeMarker(newLocation, map);
            }
        }

        function reverseGeocode(location) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: location }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].types.includes('sublocality_level_4')) {
                                    // console.log("Sublocality level 4 address: " + results[i].formatted_address);
                                    if(results[i].formatted_address){
                                        setAddress(results[i].formatted_address);
                                        if (results[i].formatted_address !== null) {
                                            document.getElementById('info').textContent = results[i].formatted_address;
                                        }
                                        setLat(location.lat());
                                        setLng(location.lng());
                                        console.log(results[i].formatted_address)
                                        // console.log(location.lat())
                                        // console.log(location.lng())
                                        break;
                                    }else{
                                        // console.log("테스트" + results[i].formatted_address)
                                        // console.log("테스트" + location.lat())
                                        // console.log("테스트" + location.lng())
                                        setAddress("테스트");
                                        setLat(location.lat());
                                        setLng(location.lng());
                                    }
                                break;
                            } else {
                                // address = '정확한 주소를 선택해 주세요.';
                                setAddress('정확한 주소를 선택해 주세요.');
                            }
                        }

                        
                    } else {
                        alert("주소를 찾을 수 없습니다.");
                    }
                } else {
                    alert("지오코딩 요청이 실패했습니다.");
                }
            });
        }


        function placeMarker(location, map) {

            

            let contentString =
                '<div id="content">' +
                '<h3 id="firstHeading" class="firstHeading">이 주소가 맞나요?</h3>' +
                '<div id="bodyContent">' +
                '<div id="info"></div><br/>' +
                "<p><b>이 주소가 아니라면 지도를 클릭하거나 마커를 드래그 해주세요.</b></p>" +
                "</div>" +
                "</div>";


            infowindow = new window.google.maps.InfoWindow({
                content: contentString
            });


            if (marker) {
                marker.setMap(null);
            }

            marker = new window.google.maps.Marker({
                position: location,
                map: map,
                draggable: true
            });

            

            map.panTo(location);

            map.addListener("click", (event) => {
                marker.setPosition(event.latLng);
                reverseGeocode(event.latLng);
                map.panTo(event.latLng);
                if (infowindow) {
                    infowindow.close();
                }
                if (infoWindowLoc) {
                    infoWindowLoc.close();
                }
    
                infowindow.open({
                    anchor: marker,
                    map,
                });
                // window.google.maps.event.clearInstanceListeners(marker);
                // window.google.maps.event.clearListeners(marker, 'click');
                
            });

            marker.addListener("dragend", (event) => {
                marker.setPosition(event.latLng);
                reverseGeocode(event.latLng);
                map.panTo(event.latLng);
                
                if (infowindow) {
                    infowindow.close();
                }
    
                infowindow.open({
                    anchor: marker,
                    map,
                });

            });

            if (infowindow) {
                infowindow.close();
            }

            infowindow.open({
                anchor: marker,
                map,
            });
        }

        

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${api.api}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (!window.google || !window.google.maps) {
                console.error("Google Maps API is not loaded.");
                return;
            }
            initMap();
        };
        document.body.appendChild(script);

        

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleAddressSelect = () => {
        setCreateData((prevData) => ({
          ...prevData,
          location: {
            ...prevData.location,
            lat: lat,
            lng: lng,
            address: address
          },
        }));

        toggleLocationWrite();
      };

    return (
        <div className='ModalLocation'>
            <div id="map"></div>
            <button className="map-button" onClick={handleAddressSelect}>주소 선택 완료</button>
            <div id="info" style={{ display: 'none' }}></div>
        </div>
    );
    
};

export default LocationWrite;
