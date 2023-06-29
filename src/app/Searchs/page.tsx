'use client'
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
  Box,
  Stack,
  Input
} from '@chakra-ui/react';

import data from "../../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json";

export default function Page() {
  const [province_isSelect, province_setSelect] = useState(true);
  const [amphur_isSelect, amphur_setSelect] = useState(true);
  const [tambon_isSelect, tambon_setSelect] = useState(true);
  const [selected_province, setSelected_province] = useState('');
  const [selected_amphur, setSelected_amphur] = useState('');
  
  const [result, setResult] = useState(null);

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
  
      const data = await response.json();
  
      if (response.ok) {
        setResult(data);
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
            bgGradient='linear(to-l, purple, white)'
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            position={'sticky'}
            py={40}
            >
        <Box
          bgColor="whiteAlpha.300"
          padding={10}
          rounded={'xl'}
          maxH="10%"
          maxW="25%">
          <Text align="center" fontSize="lg" fontWeight="bold" mb={4}>
            SEARCH EV-CHARGER
          </Text>
          <Stack direction={['column', 'row']} spacing='24px'>
          <FormControl>
            <FormLabel>จังหวัด</FormLabel>
            <Select
              placeholder='จังหวัด'
              id='Location_province'
              name='Location_province'
              onChange={(event) => {
                setSelected_province(event.target.value);
                province_setSelect(false);
              }}
            >
              {data.data.map((data) => (
                <option key={data.name_th}>{data.name_th}</option>
              ))}
            </Select>
          </FormControl>
          </Stack>
          <FormControl>
            <FormLabel>อำเภอ</FormLabel>
            <Select
              placeholder='อำเภอ'
              id='Location_amphure'
              name='Location_amphure'
              isDisabled={province_isSelect}
              onChange={(event) => {
                setSelected_amphur(event.target.value);
                amphur_setSelect(false);
              }}
            >
              {data.data.map((province) => {
                if (province.name_th === selected_province) {
                  return province.amphure.map((amphure) => (
                    <option key={amphure.name_th}>{amphure.name_th}</option>
                  ));
                } else {
                  return null;
                }
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>ตำบล</FormLabel>
            <Select
              placeholder='ตำบล'
              id='Location_tambon'
              name='Location_tambon'
              isDisabled={amphur_isSelect}
              onChange={() => tambon_setSelect(false)}
            >
              {data.data.map((province) => {
                if (province.name_th === selected_province) {
                  return province.amphure.map((amphure) => {
                    if (amphure.name_th === selected_amphur) {
                      return amphure.tambon.map((tambon) => (
                        <option key={tambon.name_th}>{tambon.name_th}</option>
                      ));
                    }
                    return null;
                  });
                }
                return null;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>CA number (รหัสเครื่อง)</FormLabel>
            <Input type='text' id="CA" name="CA" required />
          </FormControl>
          <Button
            mt={10}
            colorScheme='purple'
            type='submit'
            
          >
            Search
          </Button>
          {result !== null ? (
            <Box mt={5} >
              <Text>จังหวัด: {result.Location_province}</Text>
              <Text>อำเภอ: {result.Location_amphure}</Text>
              <Text>ตำบล: {result.Location_tambon}</Text>
            </Box>
          ) : (
            <Text mt={5}>NOT FOUND</Text>
          )}
        </Box>
      </Box>
    </form>
  );
}
