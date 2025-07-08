export const dummyData = [
    {
        id: 1,
        drugName: "アムロジピンOD錠5mg「トーワ」",
        price: 152,
        facilityName: "シメサバ薬局",
        distance: 1.2,
        dispenseCount: 182,
        dispenseAmount: 321,
        lastDispensetDate: "2025-06-14",
    },
    {
        id: 2,
        drugName: "アムロジピンOD錠5mg「トーワ」",
        price: 152,
        facilityName: "アオリイカ薬局",
        distance: 2.5,
        dispenseCount: 13,
        dispenseAmount: 24,
        lastDispensetDate: "2025-06-25",
    },
    {
        id: 3,
        drugName: "アムロジピンOD錠5mg「トーワ」",
        price: 152,
        facilityName: "イワシ薬局",
        distance: 8.8,
        dispenseCount: 56,
        dispenseAmount: 83,
        lastDispensetDate: "2025-06-29",
    },
    {
        id: 4,
        drugName: "アムロジピンOD錠5mg「トーワ」",
        price: 152,
        facilityName: "シシャモ薬局",
        distance: 0.7,
        dispenseCount: 3,
        dispenseAmount: 13,
        lastDispensetDate: "2025-04-22",
    },
    {
        id: 5,
        drugName: "アムロジピンOD錠5mg「トーワ」",
        price: 152,
        facilityName: "サワラ薬局",
        distance: 6.9,
        dispenseCount: 182,
        dispenseAmount: 321,
        lastDispensetDate: "2025-06-30",
    }
];

export interface PharmacyData {
    id: number;
    drugName: string;
    price: string;
    facilityName: string;
    distance: string;
    dispenseCount: string;
    dispenseVolume: string;
    lastDispenseDate: string;
  }