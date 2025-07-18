/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 

interface PharmacyData {
  drugName: string; 
  price: number; 
  facilityName: string; 
  distance: number; 
  dispenseCount: number; 
  dispenseAmount: number; 
  lastDispenseDate: string; 
}