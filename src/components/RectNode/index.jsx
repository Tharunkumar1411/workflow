import { Add, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Handle, Position } from "reactflow";
import styles from "./styles.module.scss";

export const RectNode = ({ id, data }) => {

    const handleClick = () => {
        if (data.onSelect) {
            data.onSelect(id, data); // Pass node data to state
        }
    };

    return (
        <div className={styles.rootContainer} onClick={handleClick}>
        <div className={styles.label}>
            {data.label}

            <IconButton
                className={styles.iconBtn}
                size="small"
                onClick={() => data.onDelete && data.onDelete(id)}
            >
            <Delete fontSize="small" />
            </IconButton>
        </div>

        <div className={styles.addIconContainer}>
            <IconButton
            size="small"
            onClick={(event) => data.onAdd && data.onAdd(event, id)}
            className={styles.addIcon}
            >
            <Add fontSize="small" />
            </IconButton>
        </div>

        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
        </div>
    );
};