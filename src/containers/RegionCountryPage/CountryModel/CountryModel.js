/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React from 'react';
import { BI_COUNTRIES_FIELD_KEY, BI_SUMMARY_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';

class CountryModel {
  data = [];
  globalViewModel = null;
  constructor(entity, globalViewModel) {
    if (entity) {
      this.data = entity ?? [];
      this.globalViewModel = globalViewModel;
    }
  }

  toRaw = () => {
    return this.data;
  };

  toCountries = () => {
    return this.data
      ?.map((item) => {
        return {
          country: item[BI_COUNTRIES_FIELD_KEY.COUNTRY_NAME],
          country_code: item[BI_COUNTRIES_FIELD_KEY.COUNTRY_CODE],
          views: item[BI_SUMMARY_FIELD_KEY.NUMBER_OF_VISITORS],
          flag: `/assets/images/flags/flag-${item[
            BI_COUNTRIES_FIELD_KEY.COUNTRY_NAME
          ]?.toLowerCase()}.png`,
        };
      })
      ?.filter((item) => {
        return item[BI_COUNTRIES_FIELD_KEY.COUNTRY_CODE];
      })
      ?.sort((a, b) => b.views - a.views)
      .slice(0, 10);
  };

  toCountriesTable = () => {
    const headerTable = ['Country', 'Bounce Rate', 'Pages/Session', 'Avg. Session Duration'];
    const accessor = [
      BI_COUNTRIES_FIELD_KEY.COUNTRY_NAME,
      BI_SUMMARY_FIELD_KEY.BOUNCE_RATE,
      BI_SUMMARY_FIELD_KEY.NUMBER_OF_PAGES_PER_SESSION,
      BI_SUMMARY_FIELD_KEY.AVERAGE_SESSION_DURATION,
    ];
    if (this.data?.length) {
      const header = accessor.map((key, index) => {
        return {
          Header: headerTable[index],
          accessor: key,
          Cell: ({ cell, column, row }) =>
            column.id === BI_COUNTRIES_FIELD_KEY.COUNTRY_NAME ? (
              <div className={'px-3'}>{`${row.index + 1}. ${cell?.value ?? null}`}</div>
            ) : column.id === BI_SUMMARY_FIELD_KEY.BOUNCE_RATE ? (
              <div className={'px-3'}>{cell?.value + '%' ?? null}</div>
            ) : column.id === BI_SUMMARY_FIELD_KEY.AVERAGE_SESSION_DURATION ? (
              <div className={'px-3'}>
                {cell?.value ? moment.utc(cell?.value * 1000).format('HH:mm:ss') : '00:00:00'}
              </div>
            ) : (
              <div className={'px-3'}>{cell?.value ?? null}</div>
            ),
        };
      });
      const data = this.data
        ?.map((item) => {
          return {
            ...item,
            ...accessor
              .map((i) => {
                return {
                  [i]: item[i],
                };
              })
              .reduce((accumulator, currentValue) => ({ ...currentValue, ...accumulator }), {}),
          };
        })
        ?.filter((item) => {
          return item[BI_COUNTRIES_FIELD_KEY.COUNTRY_CODE];
        });

      return {
        header,
        data: data,
      };
    } else {
      return {
        header: [],
        data: [],
      };
    }
  };
}

export default CountryModel;
