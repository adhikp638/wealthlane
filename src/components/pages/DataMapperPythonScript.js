import React from 'react';

const DataMapperPythonScript = () => {
  const pythonScript = `import os
import csv
import argparse

def load_mapping(mapping_file):
    mapping = {}
    with open(mapping_file, 'r') as file:
        for line in file:
            master_column, input_column = line.strip().split(' -> ')
            mapping[master_column.strip()] = input_column.strip()  # Strip whitespace
    return mapping


def process_input_records(input_records_file, mapping):
    output_records = []
    with open(input_records_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            cleaned_row = {key.strip(): value for key, value in row.items()}
            output_row = {}
            for master_column, input_column in mapping.items():
                output_row[master_column] = cleaned_row[input_column].strip()
            output_records.append(output_row)
    return output_records

def write_output(output_file, output_records, mapping):
    with open(output_file, 'w', newline='') as file:
        fieldnames = mapping.keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_records)

def main(mapping_file, input_records_file, output_file):
    mapping = load_mapping(mapping_file)
    output_records = process_input_records(input_records_file, mapping)
    write_output(output_file, output_records, mapping)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate output records based on mapping")
    parser.add_argument("mapping_file", help="Path to the mapping file")
    parser.add_argument("input_records_file", help="Path to the input records file")
    parser.add_argument("output_file", help="Path to the output file")

    args = parser.parse_args()

    mapping_file = os.path.abspath(args.mapping_file)
    input_records_file = os.path.abspath(args.input_records_file)
    output_file = os.path.abspath(args.output_file)

    main(mapping_file, input_records_file, output_file)

  
  `;

  return (
    <div>
      <pre>{pythonScript}</pre>
    </div>
  );
};

export default DataMapperPythonScript;
