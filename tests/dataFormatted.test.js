import { startDateRaw, endDateRaw, allDaysArrays, allDaysArrayFlat } from './dataFormatted';

import { startDateRaw } from '../utils/dataFormatted.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const dataSet = [
    { end_date: '2023-03-18', start_date: '2023-03-15' },
    { end_date: '2023-04-15', start_date: '2023-04-12' },
    { end_date: '2023-05-18', start_date: '2023-05-14' },
];

test('transformation de la date de début en string en format date', function () {
    const result = startDateRaw(dataSet);
    assert.strictEqual(result, [
        '2023-03-15T00:00:00.000Z',
        '2023-04-13T00:00:00.000Z',
        '2023-05-14T00:00:00.000Z',
    ]);
});
