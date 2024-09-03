document.addEventListener('DOMContentLoaded', () => {
    // 날짜 범위 설정 코드
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    // 초기 날짜 설정
    document.getElementById('start-date').value = formatDate(lastMonth);
    document.getElementById('end-date').value = formatDate(today);
    document.getElementById('start-date-display').textContent = formatDate(lastMonth).replace(/-/g, '.');
    document.getElementById('end-date-display').textContent = formatDate(today).replace(/-/g, '.');

    // 달력 팝업 표시 토글
    const dateRangeElement = document.getElementById('date-range');
    const calendarPopup = document.getElementById('calendar-popup');

    dateRangeElement.addEventListener('click', () => {
        calendarPopup.classList.toggle('visible');
    });

    // 날짜가 변경될 때 디스플레이 업데이트
    document.getElementById('start-date').addEventListener('change', (e) => {
        document.getElementById('start-date-display').textContent = e.target.value.replace(/-/g, '.');
    });

    document.getElementById('end-date').addEventListener('change', (e) => {
        document.getElementById('end-date-display').textContent = e.target.value.replace(/-/g, '.');
    });

    // 외부 클릭 시 달력 팝업 숨기기
    document.addEventListener('click', (e) => {
        if (!dateRangeElement.contains(e.target) && !calendarPopup.contains(e.target)) {
            calendarPopup.classList.remove('visible');
        }
    });

    // 선 그래프 생성 코드
    const lineCtx = document.getElementById('productionChart').getContext('2d');
    const productionChart = new Chart(lineCtx, {
        type: 'line', // 그래프 종류: 선 그래프
        data: {
            labels: ['9/1','9/3','9/5','9/7','9/9','9/11','9/13','9/15','9/17','9/19','9/21','9/23','9/25','9/27','9/29','9/31'], // X축 레이블
            datasets: [{
                label: '수확량(kg)', // 데이터셋 레이블
                data: [100, 120, 140, 160, 120, 110,100, 120, 140, 160, 120, 110,100, 120, 140], // 임의의 데이터 값
                fill: false, // 그래프 아래 부분 채우기 여부
                borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
                tension: 0.1, // 곡선의 부드러움 정도
                clip: { left: 10, top: 10, right: 10, bottom: 10 } // 선이 캔버스 밖으로 나가지 않도록 설정
            }]
        },
        options: {
            responsive: true, // 반응형 설정
            maintainAspectRatio: false, // 그래프의 비율 유지 여부 설정
            plugins: {
                legend: {
                    position: 'bottom', // 범례 위치
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // 툴팁에 표시될 텍스트 포맷팅
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false, 
                    min: 50
                }
            }
        }
    });

    // 막대 그래프 생성 코드
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar', // 그래프 종류: 막대 그래프
        data: {
            labels: ['9/1','9/3','9/5','9/7','9/9','9/11','9/13','9/15','9/17','9/19','9/21','9/23','9/25','9/27','9/29','9/31'], // X축 레이블
            datasets: [{
                label: '포기당중량(g)', // 데이터셋 레이블
                data: [100, 140, 90, 80, 100, 110,100, 140, 90, 80, 100, 110,100, 140, 90, 80, 100, 110], // 임의의 데이터 값
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // 막대의 배경 색상
                borderColor: 'rgba(153, 102, 255, 1)', // 막대의 테두리 색상
                borderWidth: 1,
                clip: { left: 10, top: 10, right: 10, bottom: 10 } // 막대가 캔버스 밖으로 나가지 않도록 설정
            }]
        },
        options: {
            responsive: true, // 반응형 설정
            maintainAspectRatio: false, // 그래프의 비율 유지 여부 설정
            plugins: {
                legend: {
                    position: 'bottom', // 범례 위치
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // 툴팁에 표시될 텍스트 포맷팅
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false, // true로 할 경우 Y축이 0부터 시작하도록 설정
                    min : 50
                }
            }
        }
    });
});
