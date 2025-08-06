'use client';

import React from 'react';
import { Box, Typography, Button, TextField, MenuItem, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema, QuizFormValues, QUIZ_TYPES } from '@/validation/quiz.validation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CreateQuizAssignmentPage() {
  const t = useTranslations('DashboardPage');

  const { control, register, handleSubmit, formState: { errors } , setValue } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      type: QUIZ_TYPES[0], // Default to the first type in the enum
      questions: [{
        text: '',
        options: ['', ''],
        correctAnswer: '',
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data: QuizFormValues) => {
    console.log(data);
    // Here you would typically send the data to your backend API
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, maxWidth: 800, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {t('createNewQuizAssignment')}
      </Typography>

      <TextField
        label="Title"
        {...register('title')}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Description"
        {...register('description')}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Type"
            fullWidth
            margin="normal"
            error={!!errors.type}
            helperText={errors.type?.message}
          >
            {QUIZ_TYPES.map((typeOption) => (
              <MenuItem key={typeOption} value={typeOption}>
                {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)} {/* Capitalize for display */}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Questions
      </Typography>

      {fields.map((item, questionIndex) => (
        <Box key={item.id} sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Question {questionIndex + 1}</Typography>
            <IconButton onClick={() => remove(questionIndex)} color="error">
              <RemoveIcon />
            </IconButton>
          </Box>

          <TextField
            label="Question Text"
            {...register(`questions.${questionIndex}.text`)}
            fullWidth
            margin="normal"
            error={!!errors.questions?.[questionIndex]?.text}
            helperText={errors.questions?.[questionIndex]?.text?.message}
          />

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Options</Typography>
          {item.options.map((_, optionIndex) => (
            <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label={`Option ${optionIndex + 1}`}
                {...register(`questions.${questionIndex}.options.${optionIndex}`)}
                fullWidth
                size="small"
                error={!!errors.questions?.[questionIndex]?.options?.[optionIndex]}
                helperText={errors.questions?.[questionIndex]?.options?.[optionIndex]?.message}
              />
              {item.options.length > 2 && (
                <IconButton onClick={() => {
                  const currentOptions = control._formValues.questions[questionIndex].options;
                  const newOptions = currentOptions.filter((_ : string, i : number ) => i !== optionIndex);
                  setValue(`questions.${questionIndex}.options`, newOptions);
                }} color="error" size="small">
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <TextField
            label="Correct Answer"
            {...register(`questions.${questionIndex}.correctAnswer`)}
            fullWidth
            margin="normal"
            error={!!errors.questions?.[questionIndex]?.correctAnswer || !!errors.questions?.[questionIndex]?.root}
            helperText={errors.questions?.[questionIndex]?.correctAnswer?.message || errors.questions?.[questionIndex]?.root?.message}
          />
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={() => append({ text: '', options: ['', ''], correctAnswer: '' })} sx={{ mt: 2, mb: 4 }}>
        Add Question
      </Button>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Quiz/Assignment
      </Button>
    </Box>
  );
}