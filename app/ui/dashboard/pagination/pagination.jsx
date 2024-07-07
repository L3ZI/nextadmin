"use client";

import styles from "./pagination.module.css";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {hasMatch} from "next/dist/shared/lib/match-remote-pattern";

const Pagination = ({count}) => {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || 1;
    const params = new URLSearchParams(searchParams);

    const ITEM_PER_PAGE = 2;

    const hasprev = ITEM_PER_PAGE * (parseInt(page)-1) > 0;
    const hasnext = ITEM_PER_PAGE *(parseInt(page)-1) < count;

    const handleChangePage = (type) => {
        type === "prev"
        ? params.set("page", parseInt(page)-1)
            : params.set("page", parseInt(page)+1)
        replace(`${pathname}?${params}`);
    }

    return (
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasprev} onClick={()=>handleChangePage("prev")}>Previous</button>
            <button className={styles.button} disabled={!hasnext} onClick={()=>handleChangePage("next")}>Next</button>
        </div>
    );
}

export default Pagination;