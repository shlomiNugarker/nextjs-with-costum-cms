/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from "../httpService";

export const tableApiService = {
  getRecordById,
  getEmptyRecord,
  getRecordByField,
  getAllRecords,
  getAllRecordsWithFilter,
  saveRecord,
  deleteRecord,
};

const siteId = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1";

async function getRecordById(tableName: string, recordId: number) {
  try {
    const response = await httpService.get(
      `/${siteId}/table/${tableName}/${recordId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch record from ${tableName}`, error);
    throw new Error(`Failed to fetch record from ${tableName}`);
  }
}

async function getEmptyRecord(tableName: string) {
  try {
    const response = await httpService.get(
      `/${siteId}/table/${tableName}/get-empty-record`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch record from ${tableName}`, error);
    throw new Error(`Failed to fetch record from ${tableName}`);
  }
}

async function getRecordByField(
  tableName: string,
  field: string,
  value: string | number
) {
  try {
    const response = await httpService.get(
      `/${siteId}/table/${tableName}/get-by-field/${field}/${value}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch record from ${tableName} by field ${field}`,
      error
    );
    throw new Error(`Failed to fetch record from ${tableName}`);
  }
}

async function getAllRecords(tableName: string) {
  try {
    const response = await httpService.get(`/${siteId}/table/${tableName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch records from ${tableName}`, error);
    throw new Error(`Failed to fetch records from ${tableName}`);
  }
}

async function getAllRecordsWithFilter(
  tableName: string,
  field: string,
  value: string
) {
  try {
    const response = await httpService.get(
      `api/${siteId}/table/${tableName}/get-all-with-filter/${field}/${value}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch records from ${tableName}`, error);
    throw new Error(`Failed to fetch records from ${tableName}`);
  }
}

async function saveRecord(tableName: string, recordData: any) {
  const method = recordData.id ? "put" : "post";
  const url = recordData.id
    ? `api/${siteId}/table/${tableName}/${recordData.id}`
    : `api/${siteId}/table/${tableName}`;
  try {
    const response = await httpService[method](url, recordData);
    return response.data;
  } catch (error) {
    console.error(`Failed to save record in ${tableName}`, error);
    throw new Error(`Failed to save record in ${tableName}`);
  }
}

async function deleteRecord(tableName: string, recordId: number) {
  try {
    const response = await httpService.delete(
      `api/${siteId}/table/${tableName}/${recordId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to delete record from ${tableName}`, error);
    throw new Error(`Failed to delete record from ${tableName}`);
  }
}
