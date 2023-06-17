# ファカーを用いてランダムなデータを生成
require 'faker'

# ファカリティのオプション
faculties = ['G: 教養科目', 'H: 人文学部', 'K: 教育学部', 'L: 法学部', 'E: 経済科学部',
          'S: 理学部', 'M: 医学部', 'D: 歯学部', 'T: 工学部', 'A: 農学部', 'X: 創生学部']

# レビューの各属性のオプション
period_years = ['2023', '2022', '2021', '2020']
period_terms = ['1ターム', '2ターム', '1, 2ターム', '3ターム', '4ターム', '3, 4ターム']
textbooks = ['必要', '不要']
attendances = ['毎回確認', 'たまに確認', 'なし']
grading_types = ['テストのみ', 'レポートのみ', 'テスト,レポート', 'その他']
content_difficulties = ['とても楽', '楽', '普通', '難', 'とても難しい']
content_qualities = ['とても良い', '良い', '普通', '悪い', 'とても悪い']

# 60個の講義を生成
60.times do |i|
  lecture = Lecture.create!(
    title: Faker::Educator.course_name,
    lecturer: Faker::Name.name,
    faculty: faculties.sample
  )

  # 各講義に対して2つのレビューを生成
  2.times do
    Review.create!(
      rating: rand(1..5),
      period_year: period_years.sample,
      period_term: period_terms.sample,
      textbook: textbooks.sample,
      attendance: attendances.sample,
      grading_type: grading_types.sample,
      content_difficulty: content_difficulties.sample,
      content_quality: content_qualities.sample,
      content: Faker::Lorem.sentence,
      lecture_id: lecture.id
    )
  end
end
