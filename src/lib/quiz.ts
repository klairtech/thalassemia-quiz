import { QuizQuestion, QuizAnswer } from './supabase'

export interface QuizSession {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  startTime: Date
  language: string
  userName: string
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  accuracy: number
  metaScore: number
  timeBonus: number
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F'
  message: string
}

export class QuizService {
  static calculateMetaScore(
    correctAnswers: number,
    totalQuestions: number,
    timeTakenSeconds: number
  ): { metaScore: number; timeBonus: number } {
    // Accuracy score (0-100)
    const accuracyScore = (correctAnswers / totalQuestions) * 100

    // Time bonus (0-30 points max)
    const timeBonus = Math.max(0, 30 - timeTakenSeconds)

    // Meta score = Accuracy + Time bonus
    const metaScore = accuracyScore + timeBonus

    return { metaScore, timeBonus }
  }

  static getGrade(metaScore: number): QuizResult['grade'] {
    if (metaScore >= 120) return 'A+'
    if (metaScore >= 110) return 'A'
    if (metaScore >= 100) return 'B+'
    if (metaScore >= 90) return 'B'
    if (metaScore >= 80) return 'C+'
    if (metaScore >= 70) return 'C'
    if (metaScore >= 60) return 'D'
    return 'F'
  }

  static getPersonalizedMessage(
    grade: QuizResult['grade']
  ): string {
    const messages = {
      'A+': [
        'Outstanding! You are a Thalassemia awareness champion! 🌟',
        'Perfect score! You truly understand Thalassemia prevention! 🏆',
        'Exceptional knowledge! You could teach others about Thalassemia! 👑',
      ],
      'A': [
        'Excellent work! You have great knowledge about Thalassemia! 🎉',
        'Fantastic! You understand Thalassemia prevention well! ⭐',
        'Amazing! You are well-informed about Thalassemia! 🌟',
      ],
      'B+': [
        'Great job! You have good knowledge about Thalassemia! 👍',
        'Well done! You understand most Thalassemia concepts! 🎯',
        'Good work! You are on the right track with Thalassemia awareness! 📚',
      ],
      'B': [
        'Good effort! You have decent knowledge about Thalassemia! ✅',
        'Nice work! You understand basic Thalassemia concepts! 📖',
        'Well done! Keep learning about Thalassemia prevention! 🌱',
      ],
      'C+': [
        'Not bad! You have some knowledge about Thalassemia! 📝',
        'Keep learning! You are making progress with Thalassemia awareness! 📈',
        'Good start! Continue exploring Thalassemia information! 🔍',
      ],
      'C': [
        'Room for improvement! Keep studying Thalassemia! 📚',
        'Keep trying! Learning about Thalassemia is important! 💪',
        'Don\'t give up! Every step in Thalassemia awareness matters! 🚀',
      ],
      'D': [
        'Keep learning! Thalassemia awareness is crucial for health! 🎓',
        'Study more! Understanding Thalassemia can save lives! ❤️',
        'Don\'t stop! Thalassemia knowledge is valuable! 🌟',
      ],
      'F': [
        'Let\'s learn together! Thalassemia awareness starts with knowledge! 🤝',
        'Every expert was once a beginner! Keep learning about Thalassemia! 🌱',
        'Knowledge is power! Start your Thalassemia learning journey today! 💡',
      ],
    }

    const gradeMessages = messages[grade]
    return gradeMessages[Math.floor(Math.random() * gradeMessages.length)]
  }

  static generateQuizResult(
    totalQuestions: number,
    correctAnswers: number,
    timeTakenSeconds: number
  ): QuizResult {
    const { metaScore, timeBonus } = this.calculateMetaScore(
      correctAnswers,
      totalQuestions,
      timeTakenSeconds
    )
    const accuracy = (correctAnswers / totalQuestions) * 100
    const grade = this.getGrade(metaScore)
    const message = this.getPersonalizedMessage(grade)

    return {
      totalQuestions,
      correctAnswers,
      timeTaken: timeTakenSeconds,
      accuracy,
      metaScore,
      timeBonus,
      grade,
      message,
    }
  }

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}
