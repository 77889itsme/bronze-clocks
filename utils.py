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

def get_dynasty(year):
    year = int(year)
    if year > -1600 & year <= -1046:
        return "Shang"
    elif year > -1046 & year <= -770:
        return "Western Zhou"
    elif year > -770 & year <= -221:
        return "Eastern Zhou"
    elif year > -221 & year <= 220:
        return "Qin Han"

def calculate_score(selected_year, start_time, end_time):
    score = 0
    labels = []

    selected_dynasty = get_dynasty(selected_year)
    correct_dynasty = get_dynasty((start_time + end_time) / 2)

    if start_time <= selected_year <= end_time:
        score = 100
        labels.extend(["total_correct", "correct_dynasty"])
    else:
        year_diff = min(abs(selected_year - start_time), abs(selected_year - end_time))

        if selected_dynasty == correct_dynasty:
            score = max(70, int(100 - year_diff / 50))
            labels.append("correct_dynasty")
            if year_diff <= 50:
                labels.append("close_guess")
        else:
            score = max(30, int(80 - year_diff / 40))
            labels.append("wrong_dynasty")
            if year_diff <= 100:
                labels.append("not_far")

    return score, labels