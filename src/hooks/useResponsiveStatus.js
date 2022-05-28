import { useResponsive } from 'ahooks';
import { useState, useEffect } from 'react';

/**
 * sizeLabel: {
 *  xs: '0',
 *  sm: '576',
 *  md: '768',
 *  lg: '992',
 *  xl: '1200',
 * }
 * @description: 通过sizeLabel来设置响应状态
 * @param {string} sizeLabel 响应状态的标签
 * @return {boolean} 返回响应状态
 */
const useResponsiveStatus = (sizeLabel = 'xl') => {
  const [responsiveFlag, setResponsiveFlag] = useState(false);
  const responsive = useResponsive();
  useEffect(() => {
    function getScreenScope() {
      for (const key in responsive) {
        if (Object.hasOwnProperty.call(responsive, key)) {
          if (key === sizeLabel && !responsive[key]) {
            setResponsiveFlag(true);
          } else if (key === sizeLabel && responsive[key]) {
            setResponsiveFlag(false);
          }
        }
      }
    }
    getScreenScope();
  }, [responsive]);
  return responsiveFlag;
};
export default useResponsiveStatus;
