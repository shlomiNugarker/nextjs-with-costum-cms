/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from "../httpService";

// קבלת רשומה לפי ID מטבלה
export async function getRecordById(tableName: string, recordId: number) {
  try {
    const response = await httpService.get(`/table/${tableName}/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch record from ${tableName}`, error);
    throw new Error(`Failed to fetch record from ${tableName}`);
  }
}

// קבלת רשומה לפי שדה מסוים
export async function getRecordByField(
  tableName: string,
  field: string,
  value: string | number
) {
  try {
    const response = await httpService.get(
      `/table/${tableName}/get-by-field/${field}/${value}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch record from ${tableName} by field ${field}`, error);
    throw new Error(`Failed to fetch record from ${tableName}`);
  }
}

// קבלת כל הרשומות בטבלה
export async function getAllRecords(tableName: string) {
  try {
    const response = await httpService.get(`/table/${tableName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch records from ${tableName}`, error);
    throw new Error(`Failed to fetch records from ${tableName}`);
  }
}

// שמירת רשומה - יצירה או עדכון
export async function saveRecord(tableName: string, recordData: any) {
  const method = recordData.id ? "put" : "post";
  const url = recordData.id
    ? `/table/${tableName}/${recordData.id}`
    : `/table/${tableName}`;
  try {
    const response = await httpService[method](url, recordData);
    return response.data;
  } catch (error) {
    console.error(`Failed to save record in ${tableName}`, error);
    throw new Error(`Failed to save record in ${tableName}`);
  }
}

// מחיקת רשומה לפי ID
export async function deleteRecord(tableName: string, recordId: number) {
  try {
    const response = await httpService.delete(`/table/${tableName}/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete record from ${tableName}`, error);
    throw new Error(`Failed to delete record from ${tableName}`);
  }
}
