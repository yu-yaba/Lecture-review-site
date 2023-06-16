# いくつかの講義を作成します
lecture1 = Lecture.create!(title: '経済学入門', lecturer: '小林', faculty: '経済科学部')
lecture2 = Lecture.create!(title: 'プログラミング基礎', lecturer: '鈴木', faculty: '工学部')

# 講義にレビューを追加します

# それぞれの講義にレビューを追加します
Review.create!(rating: 4, content: 'とても良い講義でした', period: '2023 1ターム', textbook: '必要', attendance: '毎回確認', grading_type: 'テストのみ', content_difficulty: '楽', content_quality: '普通', lecture_id: lecture1.id)
Review.create!(rating: 5, content: '難しかったです', period: '2022 2ターム', textbook: '不要', attendance: 'たまに確認', grading_type: 'レポートのみ', content_difficulty: '普通', content_quality: '良い', lecture_id: lecture2.id)

