/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 

interface PharmacyData {
  drugName: string; 
  price: number | string; 
  facilityName: string; 
  distance: number | string; 
  dispenseCount: number | string; 
  dispenseAmount: number | string; 
  lastDispenseDate: string; 
}