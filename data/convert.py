import pandas as pd
import json
import os

def convert_excel_to_json(file_in):
    try:
        base_name, _ = os.path.splitext(file_in)
        file_out = base_name + ".json"

        df = pd.read_excel(file_in)
        records = df.to_dict(orient="records")

        with open(file_out, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)

        print(f"✅ Converted '{file_in}' to '{file_out}' with {len(records)} records.")

    except FileNotFoundError:
        print(f"Error: File '{file_in}' not found.")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    input_file = "quiz.xlsx"
    convert_excel_to_json(input_file)
