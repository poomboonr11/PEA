'use client'
import {
    Box,
    chakra,
    Flex,
    Icon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Heading,
    ChakraProvider,
    IconButton,
    Input,
    Text,
    Stack,
    FormLabel,
    FormControl,
    Link,
    Switch,
  } from '@chakra-ui/react';
  import { Toast, useToast } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { SlEnergy } from 'react-icons/sl';
  import { FiServer } from 'react-icons/fi';
  import StatusIndicator from '../../components/status';
  import LineChart from '../../Mychart';
  import DrawerExample from '../../components/notificate';
  import { useSession } from 'next-auth/react';
  import { useRouter } from 'next/navigation';
  import { MapContainer, TileLayer, Marker } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import custom from '../../../../public/location.png';
  import { Popup } from 'react-leaflet';
  
const BasicStatistics = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const CA = formData.get('CA');

    try {
      const response = await fetch('/api/Search/[CA]', {
        method: 'POST',
        body: JSON.stringify({ CA }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
        if (responseData && responseData.length > 0) {
          const { Location_detail_lat, Location_detail_long } = responseData[0];
          setLatitude(Location_detail_lat);
          setLongitude(Location_detail_long);
        } else {
          setLatitude(null);
          setLongitude(null);
        }
      } else {
        setData([]);
        setLatitude(null);
        setLongitude(null);
      }
    } catch (error) {
      console.error(error);
      setData([]);
      setLatitude(null);
      setLongitude(null);
    }
  };

  const handleMarkerClick = () => {
    // โค้ดที่คุณต้องการให้ทำเมื่อคลิกที่เครื่องหมาย
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>CA NUMBER</FormLabel>
          <Input type="text" id="CA" name="CA" placeholder="XXXX" />
        </FormControl>
      </form>

      <Box mt={10}>
        {latitude !== null && longitude !== null ? (
          <MapContainer center={[latitude, longitude]} zoom={12} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
            {data.map((ca) => (
              <Marker key={ca.CA} position={[ca.Location_detail_lat, ca.Location_detail_long]} eventHandlers={{ click: handleMarkerClick }}>
                <Popup>
                  <Box>
                    <Heading size="md" mb={2}>CA-{ca.CA}</Heading>
                    <Text fontWeight="bold">{ca.Location_province}</Text>
                    <Text>{ca.Location_tambon}, {ca.Location_amphure}</Text>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <Text>No map available</Text>
        )}
      </Box>
    </Box>
  );
};

export default BasicStatistics;