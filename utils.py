def load_data(DATA_FILE):
    import json
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {} 


def select_ids(data_len, size):
    import numpy as np
    selected_ids = np.random.choice(data_len, size=size, replace=False).tolist()
    return selected_ids