/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 

interface PharmacyData {
  drugName: string; 
  price: number; // ★修正：numberに統一★
  facilityName: string; 
  distance: number; // ★修正：numberに統一★
  dispenseCount: number; // ★修正：numberに統一★
  dispenseAmount: number; // ★修正：numberに統一★
  lastDispenseDate: string; 
}