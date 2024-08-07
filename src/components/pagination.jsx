/* eslint-disable react/prop-types */

import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ paginationData,  handlePageChange }) => {
  const { totalPages, currentPage, previousPage, nextPage } = paginationData;
// console.log(paginationData,"paginationData")

  const [active, setActive] = useState(currentPage || 1);

  // useEffect(() => {
  //   setPageNumber(active);
  // }, [active, setPageNumber]);

  useEffect(() => {
    if (active !== currentPage) {
      setActive(currentPage);
    }
  }, [active, currentPage]);

  const nextButton = () => {
    if (active < totalPages) {
      setActive(active + 1); 
      handlePageChange(active + 1)
    }
  };

  const prevButton = () => {
    if (active > 1) {
      setActive(active - 1);
      handlePageChange(active - 1)
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, active - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          // {...getItemProps(i)}
          onClick={() => {
            handlePageChange(i);
            setActive(i);
          }}
          variant={active === i ? "filled" : "text"}
          className={`px-4 py-2 text-color-text text-md ${active === i ? "bg-color-button text-white" : ""}`}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (

    <div className="flex justify-center items-center gap-4 py-5 md:py-10">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prevButton}
        disabled={previousPage === null}
      >
        <IoIosArrowBack strokeWidth={2} className="h-4 w-4" />
        Previous
      </Button>
      {renderPageButtons()}

      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={nextButton}
        disabled={nextPage === null}
      >
        Next
        <IoIosArrowForward strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
