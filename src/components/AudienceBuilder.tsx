import React from 'react';
import { PlusCircle, X } from 'lucide-react';
import { AudienceCondition } from '../types';

interface Props {
  conditions: AudienceCondition[];
  onChange: (conditions: AudienceCondition[]) => void;
}

const fields = [
  { label: 'Total Spending', value: 'totalSpending' },
  { label: 'Visit Count', value: 'visitCount' },
  { label: 'Last Visit', value: 'lastVisit' },
];

const operators = [
  { label: 'Greater than', value: 'gt' },
  { label: 'Less than', value: 'lt' },
  { label: 'Equal to', value: 'eq' },
  { label: 'Greater than or equal', value: 'gte' },
  { label: 'Less than or equal', value: 'lte' },
];

export default function AudienceBuilder({ conditions, onChange }: Props) {
  const addCondition = () => {
    onChange([
      ...conditions,
      {
        field: 'totalSpending',
        operator: 'gt',
        value: 0,
        conjunction: conditions.length === 0 ? 'AND' : 'OR',
      },
    ]);
  };

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, updates: Partial<AudienceCondition>) => {
    onChange(
      conditions.map((condition, i) =>
        i === index ? { ...condition, ...updates } : condition
      )
    );
  };

  return (
    <div className="space-y-4">
      {conditions.map((condition, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
        >
          {index > 0 && (
            <select
              className="form-select rounded-md border-gray-300"
              value={condition.conjunction}
              onChange={(e) =>
                updateCondition(index, { conjunction: e.target.value as 'AND' | 'OR' })
              }
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}

          <select
            className="form-select rounded-md border-gray-300"
            value={condition.field}
            onChange={(e) => updateCondition(index, { field: e.target.value })}
          >
            {fields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>

          <select
            className="form-select rounded-md border-gray-300"
            value={condition.operator}
            onChange={(e) =>
              updateCondition(index, {
                operator: e.target.value as AudienceCondition['operator'],
              })
            }
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-input rounded-md border-gray-300"
            value={condition.value}
            onChange={(e) =>
              updateCondition(index, { value: parseFloat(e.target.value) })
            }
          />

          <button
            onClick={() => removeCondition(index)}
            type="button"
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}

      <button
        onClick={addCondition}
        type="button"
        className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Condition
      </button>
    </div>
  );
}